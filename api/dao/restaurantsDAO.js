
let restaurants; // store a reference to db

export default class RestaurantsDAO {
  //initialy connect to db, call this method as soon as the server start
  //when the server start we get a reference to the restaurant db

  static async injectDB(conn) {
    if (restaurants) {
      // if we got a reference then return
      return;
    }
    try {
      // if restaurant is empty we fill the reference
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantsDAO: ${e}`
      );
    }
  }

  static async getRestaurants({
    // we call this when we want a list of all restaurants
    filters = null,
    page = 0,
    restaurantsPerPage = 20, // options created, when call the method we can put filters, pages and perpage
  } = {}) {
    let query; // first the query is empty and remain empty unless someone pass a filter
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }; // search by name
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } }; // search by cuisine
      } else if ("zipcode" in filters) {
        query = { "adress.zipcode": { $eq: filters["zipcode"] } }; // search by zipcode
      }
    }

    let cursor;
    try {
      cursor = await restaurants // find all the restaurants that go along with the query
        .find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { restaruantsList: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();  // convert to an array
      const totalNumRestaurants = await restaurants.countDocuments(query); 

      return { restaurantsList, totalNumRestaurants }; //return the array
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { resturantsList: [], totalNumRestaurants: 0 };
    }
  }
}
