describe("API Testing - GET Request", () => {
  it("should return status 200 for posts API", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts").should(
      (response) => {
        expect(response.status).to.eq(200); // Ensure the status is 200 OK
        expect(response.body).to.have.length.greaterThan(0); // Ensure there's data in the body
      }
    );
  });

  it("should return a specific post with status 200", () => {
    const postId = 1;
    cy.request(`https://jsonplaceholder.typicode.com/posts/${postId}`).should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id", postId); // Check that the post ID is correct
      }
    );
  });

  it("should return status 404 for non-existing post", () => {
    const nonExistentPostId = 9999;
    cy.request({
      url: `https://jsonplaceholder.typicode.com/posts/${nonExistentPostId}`,
      failOnStatusCode: false, // Don't fail the test on a 404 response
    }).should((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

describe("API Testing - POST Request", () => {
  it("should create a new post and return status 201", () => {
    const newPost = {
      title: "foo",
      body: "bar",
      userId: 1,
    };

    cy.request(
      "POST",
      "https://jsonplaceholder.typicode.com/posts",
      newPost
    ).should((response) => {
      expect(response.status).to.eq(201); // Check if post was created successfully
      expect(response.body).to.have.property("id"); // Ensure the response contains a new ID
      expect(response.body).to.deep.include(newPost); // Validate that the data is the same as the request body
    });
  });
});

describe("API Testing - PUT Request", () => {
  it("should update an existing post and return status 200", () => {
    const updatedPost = {
      title: "updated title",
      body: "updated body",
      userId: 1,
    };

    cy.request(
      "PUT",
      "https://jsonplaceholder.typicode.com/posts/1",
      updatedPost
    ).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.include(updatedPost); // Ensure the updated data is returned in the response
    });
  });
});

describe("API Testing - DELETE Request", () => {
  it("should delete an existing post and return status 200", () => {
    const postIdToDelete = 1;

    cy.request(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`
    ).should((response) => {
      expect(response.status).to.eq(200); // Expect a successful deletion status code
    });
  });

  it("should return status 404 when trying to delete a non-existent post", () => {
    const nonExistentPostId = 9999;

    cy.request({
      url: `https://jsonplaceholder.typicode.com/posts/${nonExistentPostId}`,
      method: "DELETE",
      failOnStatusCode: false, // Don't fail the test on a 404 response
    }).should((response) => {
      expect(response.status).to.eq(404); // Non-existent post should return 404
    });
  });
});

describe("API Testing - Header Validation", () => {
  it("should return valid content-type header for posts API", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.headers)
          .to.have.property("content-type")
          .and.include("application/json"); // Check content-type header
      }
    );
  });
});

describe("API Testing - Response Time", () => {
  it("should respond in less than 200ms for posts API", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(200); // Check if the response time is under 200ms
      }
    );
  });
});

describe("API Testing - Query Parameters", () => {
  it("should return posts filtered by userId", () => {
    const userId = 1;
    cy.request(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    ).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.greaterThan(0); // Ensure posts are returned
      response.body.forEach((post) => {
        expect(post).to.have.property("userId", userId); // Validate that the userId is correct
      });
    });
  });
});

describe("API Testing - Response Body Validation", () => {
  it("should validate the properties of the first post", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts/1").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("title").and.be.a("string");
        expect(response.body).to.have.property("body").and.be.a("string");
        expect(response.body).to.have.property("userId").and.be.a("number");
      }
    );
  });
});

describe("API Testing - PATCH Request", () => {
  it("should partially update an existing post and return status 200", () => {
    const updatedFields = {
      title: "partially updated title",
    };

    cy.request({
      method: "PATCH",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      body: updatedFields,
    }).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.include(updatedFields); // Ensure the updated fields are returned
    });
  });
});
