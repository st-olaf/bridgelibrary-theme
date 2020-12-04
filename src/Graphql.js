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
                        courses {
                            ... on Course {
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
                                        ... on Resource {
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
                                    }
                                    relatedCoursesResources {
                                        ... on Resource {
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
                                    }
									librarians {
										... on Librarian {
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
									}
                                }
                            }
                        }
                        coursesCacheUpdated
                        primoFavorites {
                            ... on Resource {
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
                                }
                            }
                        }
                        primoFavoritesCacheUpdated
                        librarians {
                            ... on Librarian {
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
                        }
                        librariansCacheUpdated
                        circulationData
                        circulationDataCacheUpdated
                    }
                }
            }
        }
    }
`;
