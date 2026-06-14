import Website from "../models/websites";

export const getWebsitesPerCity = async () => {
    return await Website.aggregate([
        {
            $group: {
                _id: "$city",
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                city: "$_id",
                count: 1,
            },
        },
        {
            $sort: {
                count: -1,
            },
        },
    ]);
};

export const getWebsitesPerStars = async () => {
  return await Website.aggregate([
    {
      $group: {
        _id: "$stars",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        stars: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        stars: -1,
      },
    },
  ]);
};


export const getTopCities = async (
  limit: number
) => {
  return await Website.aggregate([
    {
      $group: {
        _id: "$city",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        city: "$_id",
        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: limit,
    },
  ]);
};