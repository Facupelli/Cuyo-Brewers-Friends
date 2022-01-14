import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById } from "../../utils/recipesUtils";
import { RecipeList, Review } from "../../redux/reducers/types";
import { MdDelete } from "react-icons/md";
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import axios from "axios";
//Components
import { YeastDetail } from "./YeastDetail";
import { CommentList } from "./CommentList";
import { NavBar } from "../NavBar";
import { CharacteristicsDetail } from "./CharacteristicsDetail";
import { ParametersDetail } from "./ParametersDetail";
import { FermentablesDetail } from "./FermentablesDetail";
import { HopsDetail } from "./HopsDetail";
import { WaterDetail } from "./WaterDetail";
import { CommentForm } from "./CommentForm";
import { UserData } from "./UserData";
import { getRecipes, getTopRecipes, getUserData } from "../../redux/action-creators";

type RecipeCardDetailParams = {
  id: string;
};

export interface State {
  recipe: RecipeList;
}

export const RecipeCardDetail: React.FC = () => {
  const { id } = useParams<RecipeCardDetailParams>();

  const userData = useSelector((state: RootState) => state.storeUser.userData);

  const isMyRecipe = () => {
    const is = userData.ownRecipes.filter((el) => el._id === id);
    if (is.length === 1) return true;
    else return false;
  };

  const [recipeState, setRecipeState] = useState<State>({
    recipe: {
      recipe: {
        title: "",
        style: {
          value: "",
          label: "",
        },
        sub_category: "",
        brewery: "",
        parameters: {
          boil_time: 0,
          batch_size: 0,
          pre_boil_size: 0,
          pre_boil_gravity: 0,
          mash_ph: 0,
          efficiency: 0,
        },
        characteristics: {
          original_gravity: 0,
          final_gravity: 0,
          alcohol_by_volume: 0,
          ibu: 0,
          srm: 0,
        },
        ingredients: {
          fermentables: [],
          hops: [
            {
              name: { name: "", label: "", id: 0 },
              quantity: 0,
              time: 0,
              use: "",
              temperature: 0,
            },
          ],
          yeast: {
            name: "",
            quantity: 0,
            attenuation: 75,
          },
          water_profile: {
            calcium: 0,
            magnesium: 0,
            sodium: 0,
            chlorine: 0,
            sulfate: 0,
            bicarbonate: 0,
          },
        },
        photos: [],
      },
      username: "",
      author: "",
      _id: "",
      date: "",
      reviews: [],
    },
  });

  console.log("RECIPE", recipeState);

  useEffect(() => {
    getRecipeById(id)
      .then((data) => setRecipeState({ recipe: data }))
      .catch((e) => console.log(e));
  }, [id]);

  const { title, sub_category }: { title: string; sub_category: string } =
    recipeState.recipe.recipe;
  const { mash_ph }: { mash_ph: number } = recipeState.recipe.recipe.parameters;
  const { username, reviews }: { username: string; reviews: Review[] } =
    recipeState.recipe;

  const [modal, setModal] = useState(false);

  const handleDeleteModal = () => {
    setModal(true);
  };

  const handleAddFav = () => {

  };
  
  return (
    <>
      <NavBar route="recipeDetail" />

      <div className="my-8 mx-24">
        <div className="flex items-center py-4">
          <p className="font-semibold text-4xl text-brown1">{title}</p>
          {isMyRecipe() && (
            <div
              onClick={handleDeleteModal}
              className="cursor-pointer ml-auto text-brown1 text-4xl"
            >
              <MdDelete />
            </div>
          )}
          {!isMyRecipe() && (
            <div 
            onClick={handleAddFav}
            className="cursor-pointer ml-6 text-blueLight text-4xl">
              <FaRegHeart />
            </div>
          )}
        </div>

        <div className="grid grid-cols-5 gap-4 ">
          <div className="col-span-1 border border-gray-800 rounded h-full ">
            <UserData username={username} />
          </div>
          <div className="col-span-4">
            <ParametersDetail
              style={sub_category}
              parameters={recipeState.recipe.recipe.parameters}
            />
          </div>
        </div>

        <CharacteristicsDetail
          mash_ph={mash_ph}
          characteristics={recipeState.recipe.recipe.characteristics}
        />

        <WaterDetail
          water={recipeState.recipe.recipe.ingredients.water_profile}
        />

        <FermentablesDetail
          fermentables={recipeState.recipe.recipe.ingredients.fermentables}
        />

        <HopsDetail hops={recipeState.recipe.recipe.ingredients.hops} />

        <YeastDetail yeast={recipeState.recipe.recipe.ingredients.yeast} />

        <div className="my-16">
          <p className="font-semibold text-xl">Reviews</p>
          {username === userData.username ? null : (
            <CommentForm recipe_id={id} setRecipeState={setRecipeState} />
          )}

          <CommentList reviews={reviews} />
        </div>
      </div>

      {modal && <DeleteModal setModal={setModal} id={id} />}
    </>
  );
};

//------------------------------ DELETE MODAL ----------------------------------------------

type Props = {
  setModal: React.Dispatch<React.SetStateAction<any>>;
  id: unknown;
};

const DeleteModal: React.FC<Props> = ({ setModal, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const handleDelete = async () => {
    await axios.delete(`/recipe?id=${id}`);
    setModal(false);
    dispatch(getUserData(userId));
    dispatch(getRecipes());
    dispatch(getTopRecipes())
    navigate("/myrecipes");
  };

  const handleCloseModal = () => {
    setModal(false);
  };
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full">
      <div className="relative px-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow-lg">
          <div className="border rounded-lg p-6 space-y-6">
            <div className="flex justify-center">
              <p className="text-lg font-semibold">
                Are you sure you want to delete this recipe?
              </p>
            </div>
            <div className="flex justify-evenly">
              <button
                onClick={handleDelete}
                className="bg-blue-200 rounded px-2 "
              >
                YES
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-200 rounded px-2 "
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
