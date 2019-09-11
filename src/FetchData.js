import { USER_QUERY } from "./Graphql"

export let GET_COURSES = `query GetCourses($slug: String) {
                            courses(where: {name: $slug}, first: 1) {
                              edges {
                                node {
                                  id
                                  title
                                  slug
                                  courseData {
                                    almaId,
                                    courseCode,
                                    courseNumber,
                                    startDate,
                                    endDate,
                                    institution {
                                      ... on Institution {
                                        id,
                                        name,
                                      }
                                    },
                                    academicDepartment {
                                      ... on AcademicDepartment {
                                        id,
                                        name,
                                      }
                                    },
                                    courseTerm {
                                      ... on CourseTerm {
                                        id,
                                        name,
                                      }
                                    },
                                    coreResources {
                                      ... on Resource {
                                        id,
                                        slug,
                                        title,
                                        content,
                                        resourceData {
                                          almaId,
                                          primoId,
                                          url,
                                          imageUrl {
                                            id,
                                            altText,
                                            sourceUrl,
                                          },
                                          primoImageUrl,
                                          primoImageInfo,
                                          author,
                                          isbn,
                                          publicationYear,
                                          resourceFormat {
                                            ... on ResourceFormat {
                                              id,
                                              name,
                                            },
                                          },
                                          resourceType {
                                            ... on ResourceType {
                                              id,
                                              name,
                                              ancestors {
                                                name,
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                    relatedCoursesResources {
                                      ... on Resource {
                                        id,
                                        slug,
                                        title,
                                        content,
                                        resourceData {
                                          almaId,
                                          primoId,
                                          url,
                                          imageUrl {
                                            id,
                                            altText,
                                            sourceUrl,
                                          },
                                          primoImageUrl,
                                          primoImageInfo,
                                          author,
                                          isbn,
                                          publicationYear,
                                          resourceFormat {
                                            ... on ResourceFormat {
                                              id,
                                              name,
                                            },
                                          },
                                          resourceType {
                                            ... on ResourceType {
                                              id,
                                              name,
                                              ancestors {
                                                name,
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  }
                                }
                              }
                            }
                          }`

export let GET_RESOURCES = 
  `query GetResources($slug: String) {
    resources(where: {name: $slug}, first: 1) {
      edges {
        node {
          id
          slug
          title
          resourceData {
            url
            author
            imageUrl {
              sourceUrl
            }
            primoImageInfo
            publicationYear
            resourceFormat {
              ... on Category {
                id
                name
              }
            }
            relatedDepartments {
              ... on Category {
                id
                name
              }
            }
            relatedCoursesResources {
              ... on Course {
                id
              }
            }
          }
        }
      }
    }
  }`
     
export let GET_LIBRARIANS =  
  `query GetLibrarians($slug: String) {
    librarians(where: {name: $slug}, first: 1){
      edges {
        node {
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
              email
              username
              description
              userData {
                librarian {
                  emailAddress
                  phoneNumber
                  officeLocation
                }
              }
            }
          }
        }
      }
    }
  }`
