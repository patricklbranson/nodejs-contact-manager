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

const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact.model");

//@desc Get Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    req.status(404);
    throw new Error("Contact Not Found");
  }

  res.status(201).json(contact);
});

//@desc Get all Contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create all Contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are Required!");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    req.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User cannot update information from another user contacts"
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    req.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User cannot update information from another user contacts"
    );
  }

  // API NOTE: The tutorial is wrong about the @code { await Contact.remove(); } line of code
  // It is possible it has changed since the development of the API. It is @code{ await Contact.deleteOne(); }
  // Source: https://mongoosejs.com/docs/api/model.html#Model.prototype.deleteOne()
  await Contact.deleteOne({ _id: req.params.id }); // Note: the id was added after token was established it was empty parameters beforehand
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
