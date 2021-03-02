import gql from "graphql-tag";

export const USER_QUERY = gql`
    query GET_USERS($email: String) {
        users(where: { search: $email }, first: 1) {
            edges {
                node {
                    id
                    databaseId
                    name
                    email
                    nicename
                    userData {
                        alternateId
                        bridgeLibraryInstitution
                        userFavorites {
                            ...Resource
                        }
                        courses {
                            ...Course
                        }
                        coursesCacheUpdated
                        primoFavorites {
                            ...Resource
                        }
                        primoFavoritesCacheUpdated
                        librarians {
                            ...Librarian
                        }
                        librariansCacheUpdated
                        circulationData
                        circulationDataCacheUpdated
                    }
                    userInterestFeeds {
                        ...UserInterestFeed
                    }
                }
            }
        }
    }

    fragment Course on Course {
        id
        slug
        title
        courseData {
            almaId
            courseCode
            courseNumber
            startDate
            endDate
            institution {
                ... on Institution {
                    id
                    name
                }
            }
            academicDepartment {
                ... on AcademicDepartment {
                    id
                    name
                }
            }
            courseTerm {
                ... on CourseTerm {
                    id
                    name
                }
            }
            coreResources {
                ...Resource
            }
            relatedCoursesResources {
                ...Resource
            }
            librarians {
                ...Librarian
            }
        }
    }

    fragment Librarian on Librarian {
        id
        slug
        title
        librarianData {
            academicDepartment {
                ... on AcademicDepartment {
                    name
                }
            }
            librarianUserId {
                id
                userData {
                    pictureUrl
                    librarian {
                        emailAddress
                        picture {
                            sourceUrl
                            title
                        }
                        phoneNumber
                        officeLocation
                        website
                    }
                }
            }
        }
    }

    fragment Resource on Resource {
        id
        slug
        title
        content
        resourceData {
            almaId
            primoId
            url
            imageUrl {
                id
                altText
                sourceUrl
            }
            primoImageUrl
            primoImageInfo
            author
            isbn
            publicationYear
            resourceFormat {
                ... on ResourceFormat {
                    id
                    name
                }
            }
            resourceType {
                ... on ResourceType {
                    id
                    name
                    ancestors {
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    }

    fragment UserInterestFeed on UserInterestFeed {
        id
        feedName
        slug
        subscribeUrl
    }
`;

export const ADD_USER_FAVORITE = gql`
    mutation ADD_USER_FAVORITE($userId: ID, $favoriteId: ID) {
        addUserFavorite(
            input: {
                clientMutationId: "addUserFavorite"
                id: $userId
                favoriteId: $favoriteId
            }
        ) {
            id
            favorites
        }
    }
`;

export const REMOVE_USER_FAVORITE = gql`
    mutation REMOVE_USER_FAVORITE($userId: ID, $favoriteId: ID) {
        removeUserFavorite(
            input: {
                clientMutationId: "removeUserFavorite"
                id: $userId
                favoriteId: $favoriteId
            }
        ) {
            id
            favorites
        }
    }
`;
