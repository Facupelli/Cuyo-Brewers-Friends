import React, {  useState } from "react";
import * as yup from "yup";
import { RecipeList } from "../../redux/reducers/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { getRecipes, getUserData } from "../../redux/action-creators";
import { FaQuestionCircle } from "react-icons/fa";

//Components
import { YeastForm } from "./YeastForm";
import { TitleInfo } from "./TItleInfo";
import { Characteristics } from "./Characteristics";
import { NavBar } from "../NavBar";
import { HopsForm } from "./HopsForm";
import { MaltsForm } from "./MaltsForm";
import { WaterForm } from "./WaterForm";
import { BatchParams } from "./BatchParams";
import { Modal } from "../Modal";
import { Mash } from "./Mash";

const schema = yup.object().shape({
  title: yup.string().required().min(2),
  style: yup
    .object()
    .shape({ name: yup.string(), label: yup.string() })
    .required(),
  sub_category: yup.string().required().min(2).max(25),
  brewery: yup.string().min(0).max(50),
  parameters: yup.object().shape({
    boil_time: yup
      .number()
      .typeError("Must be a number")
      .required("Boil Time is required")
      .positive()
      .min(0)
      .max(500),
    batch_size: yup
      .number()
      .typeError("Must be a number")
      .required("Batch Size is required")
      .positive()
      .min(1)
      .max(5000),
    // pre_boil_size: yup.number().typeError('Must be a number').required().positive().min(1).max(1000),
    pre_boil_gravity: yup
      .number()
      .typeError("Must be a number")
      .required("Pre Boil Gravity is required")
      .positive()
      .min(1)
      .max(2000),
    mash_ph: yup
      .number()
      .typeError("Must be a number")
      .required("Mash Ph is required")
      .positive()
      .min(0)
      .max(10),
    efficiency: yup
      .number()
      .typeError("Must be a number")
      .required("Efficiency is required")
      .positive()
      .min(0)
      .max(100),
  }),
  characteristics: yup.object().shape({
    original_gravity: yup
      .number()
      .typeError("Must be a number")
      .positive()
      .min(0)
      .max(1200),
    final_gravity: yup
      .number()
      .typeError("Must be a number")
      .positive()
      .min(0)
      .max(1200),
    alcohol_by_volume: yup
      .number()
      .typeError("Must be a number")
      .positive()
      .min(0)
      .max(20),
    ibu: yup.number().typeError("Must be a number").min(0).max(200),
    srm: yup.number().typeError("Must be a number").min(0).max(100),
  }),
  ingredients: yup.object().shape({
    fermentables: yup.array().of(
      yup.object().shape({
        name: yup.object().shape({
          name: yup.string(),
          label: yup.string(),
          color: yup.number(),
          potential: yup.number(),
          yield: yup.number(),
        }),
        quantity: yup.number().positive(),
      })
    ),
    hops: yup.array().of(
      yup.object().shape({
        name: yup.object().shape({ name: yup.string(), label: yup.string() }),
        quantity: yup.number().typeError("Must be a number").positive().min(1),
        time: yup.number().typeError("Must be a number"),
        use: yup.string(),
        temperature: yup.number().typeError("Must be a number"),
      })
    ),
    yeast: yup.object().shape({
      name: yup.string(),
      attenuation: yup.number(),
      quantity: yup.number(),
    }),
    water_profile: yup.object().shape({
      calcium: yup.number().typeError("Must be a number"),
      magnesium: yup.number().typeError("Must be a number"),
      sodium: yup.number().typeError("Must be a number"),
      chlorine: yup.number().typeError("Must be a number"),
      sulfate: yup.number().typeError("Must be a number"),
      bicarbonate: yup.number().typeError("Must be a number"),
    }),
  }),
  mash: yup.object().shape({
    thickness: yup.number(),
    grain_temperature: yup.number(),
    guide: yup.array().of(
      yup.object().shape({
        amount: yup.number().typeError("Must be a number"),
        start_temp: yup.number().typeError("Must be a number"),
        target_temp: yup.number().typeError("Must be a number"),
        time: yup.number().typeError("Must be a number"),
      })
    ),
  }),
});

export const CreateRecipe: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [questionModal, setQuestionModal] = useState<boolean>(false);
  

  const username = useSelector(
    (state: RootState) => state.storeUser.userData.username
  );
  const user_id = useSelector(
    (state: RootState) => state.storeUser.userData._id
  );

  //OG STATE----------------------------
  const [ogPoints, setOgPoints] = useState<number>(0);
  const [eff, setEff] = useState<number>(70);
  const [batch_size, setBatch_size] = useState<number>(20);

  // FG STATE ------------------------------
  const [yeastAtt, setYeastAtt] = useState<number>(75);

  //  SRM --------------------------
  const [mcu, setMcu] = useState<number>(0);

  //FORM ---------
  const methods = useForm<RecipeList>({ resolver: yupResolver(schema) });
  const errors = methods.formState.errors;
  console.log("ERRORS", errors);

  const formSubmitHandler: SubmitHandler<RecipeList> = async (
    data: RecipeList
  ) => {
    try {
      console.log("FORM DATA IS", data);
      const newRecipe = {
        recipe: data,
        username,
        user_id,
      };
      const response = await axios
        .post("/recipe", newRecipe)
        .then((res) => setSuccessModal(true));
      console.log("RESPONSE:", response);
      dispatch(getRecipes());
      dispatch(getUserData(user_id));
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  const handleQuestionClick = () => {
    setQuestionModal(true)
  }

  const message = `El OG, FG, SRM y ABV son calculados automáticamente según los ingredientes 
  seleccionados. El unico parámetro que tendrá que colocar ya que no es calculado por la app 
  es el IBU. Hemos decidido dejar a elección de cada cervecero como calcular dicho valor.`;

  return (
    <>
      {successModal && (
        <Modal
          setModal={setSuccessModal}
          message="Recipe created successfully"
          pathTo="/myrecipes"
        />
      )}
      {questionModal && (
        <Modal setModal={setQuestionModal} message={message} size="lg" />
      )}
      <div className="bg-gray-50 ">
        <NavBar route="createrecipe" />
        <div className="max-w-7xl mx-auto">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
              {/* ------------    PART 1 ------------------------ */}
              <div className="mx-8 mt-8 flex justify-start items-baseline gap-x-4">
                <p className="text-2xl font-semibold text-main">
                  Editing Recipe
                </p>
                <button type="button" onClick={handleQuestionClick} className="text-mainC hover:text-mainC2 text-xl">
                  <FaQuestionCircle />
                </button>
                <button
                  type="submit"
                  className="transition ease-in-out duration-150 bg-transparent ml-auto hover:bg-mainC2 text-main font-semibold hover:text-white p-2 border border-mainC2 hover:border-transparent rounded"
                >
                  SAVE
                </button>
              </div>

              <TitleInfo />

              {/* -------------------    PARAMETERS ------------------------ */}

              <BatchParams setEff={setEff} setBatch_size={setBatch_size} />

              {/* --------------------    CHARACTERISTICS ------------------------ */}

              <Characteristics
                eff={eff}
                batch_size={batch_size}
                ogPoints={ogPoints}
                yeastAtt={yeastAtt}
                mcu={mcu}
              />

              {/* ------------------------ INGREDIENTS ----------------------------- */}

              <div className="grid grid-cols-2">
                <div className="col-span-2 md:col-span-1">
                  <MaltsForm
                    setOgPoints={setOgPoints}
                    batch_size={batch_size}
                    setMcu={setMcu}
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <HopsForm />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <Mash />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <YeastForm setYeastAtt={setYeastAtt} />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <WaterForm />
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};
