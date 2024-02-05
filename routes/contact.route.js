/*
 *  Copyright 2024 Patrick L. Branson
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require("express");
const router = express.Router();

const {
  createContact,
  getContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contact.controller");
const validateToken = require("../middleware/validate.middleware");

/*
Older version: Kept for learning exercise

// CRUD: CREATE
router.route("/").post(createContact);

// CRUD: READ
router.route("/").get(getContacts);

// CRUD: READ - Individual ID
router.route("/:id").get(getContact);

// CRUD: UPDATE
router.route("/:id").put(updateContact);

// CRUD: DELETE
router.route("/:id").delete(deleteContact);

*/

/**
 * All the CRUD code above can be simplified to the bottom two lines.
 * I do not do this because I am still learning CRUD and I wanted to make
 * it simple to read for me
 * @code {
 *      router.route("/").get(getContacts).post(createContact);
 *      router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
 * }
 */

// Validates the token
router.use(validateToken);

// Newest version (simplified)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
