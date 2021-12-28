import React from "react";
import { useTable } from "react-table";
import { RecipeList } from "../../redux/reducers/types";

interface Props {
  recipes: RecipeList[];
}

export const SearchRecipesTable: React.FC<Props> = ({ recipes }) => {

  const recipeRating = () => {
    const reviews = recipes
      .map((el) => el.reviews)
      .map((el) => el.map((el) => el.score));
    return reviews.map((el) => {
      if (el.length === 0) return 0;
      if (el.length > 0) return el.reduce((a, b) => a + b) / el.length;
    });
  };

  const averages = recipeRating();

  const data = React.useMemo(() => recipes, [recipes]);

  console.log('RECIPES', recipes)

  type Cell = {
    value: string;
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "recipe.title", // accessor is the "key" in the data
      },
      {
        Header: "Style",
        accessor: "recipe.style",
        Cell: ({ cell: { value } }: { cell: Cell }) => value.split(". ")[1],
      },
      {
        Header: "Size",
        accessor: "recipe.parameters.batch_size",
      },
      {
        Header: "OG",
        accessor: "recipe.characteristics.original_gravity",
      },
      {
        Header: "FG",
        accessor: "recipe.characteristics.final_gravity",
      },
      {
        Header: "ABV",
        accessor: "recipe.characteristics.alcohol_by_volume",
      },
      {
        Header: "IBU",
        accessor: "recipe.characteristics.ibu",
      },
      {
        Header: "Color",
        accessor: "recipe.characteristics.srm",
      },
      {
        Header: "Rating",
        accessor: "reviews.score",
      },
    ],
    []
  );

  
  console.log("RATING", averages);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<any>({
      columns,
      data,
    });

  return (
    <div>
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="pb-4 text-left" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="pb-4" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
