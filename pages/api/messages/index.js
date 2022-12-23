import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, response) {
    
    const { database } = await connectToDatabase();
    const collection = database.collection("userMessages")
    if(req.method === "GET") {
      let query = {}
      let page = req.query.page || 0;
  
    //   if(req.body.consumer_no) {
    //     query = {...query, "consumer_no": req.body.consumer_no};
    //   }

      
      console.log(query)
      console.log(req.query.page)
      let totalCount = await collection.find(query).count();
      let data = await collection.aggregate(
        [
            {$match:query},
            {$skip:page*20},
            {$limit:20},
            {
              $project: {
                    _id: 0,
                },
            },
        ]).toArray();
      return response.status(200).json({totalCount: totalCount,data:data});
    }

}