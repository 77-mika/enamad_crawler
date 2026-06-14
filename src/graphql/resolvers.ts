import website from "../models/websites";

export const resolvers = {
    Query: {
        websites: async (_: unknown, args: any) => {

            const filter: any = {};

            if (args.city) {
                filter.city = args.city;
            }
            if (args.province) {
                filter.province = args.province;
            }
            if (args.stars) {
                filter.stars = args.stars;
            }
            return await website.find(filter).lean();
        },
    },
};
