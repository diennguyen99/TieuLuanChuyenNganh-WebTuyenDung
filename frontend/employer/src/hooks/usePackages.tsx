import { gql, useQuery } from "@apollo/client";
import { packagesQuery } from "../__generated__/packagesQuery";

const PACKAGES_QUERY = gql`
    query packagesQuery {
        packages {
            results {
                id
                name
                price
                duration
                isFeatured
                isSupport
                packageType
            }
        }
    }
`;

export const usePackages = () => {
  return useQuery<packagesQuery>(PACKAGES_QUERY);
};
