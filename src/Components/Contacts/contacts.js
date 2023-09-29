import React, { useState} from "react";
import { useSelector } from "react-redux";

import classes from "./contacts.scss";
import Footer from "../Footer/footer";
import axios from "axios";
import { FormGroup } from "react-bootstrap";
import validator from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import Button from "react-validation/build/button";

import { useToast } from "@chakra-ui/react";

const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return "require";
  }
};

const email = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`;
  }
};


const Map = () => {
  return (
    
      
        <iframe
          loading="lazy"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=BITS%20Pilani+(NSS%20BITS%20Pilani)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
    
    
  );
};

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const url1 =
    "https://sheet.best/api/sheets/248abfa7-c565-4532-965f-abf3cfcad2cd";
  const url2 =
    "https://sheet.best/api/sheets/e5b55fdb-b595-457c-b8cc-19b267de77f6";
  const toast = useToast();

  const submitHandler = (e) => {
    e.preventDefault();
    setFormData({ name: "", email: "", message: "" });

    const d = new Date();

    axios
      .post(Math.random() < 0.5 ? url1 : url2, {
        ...formData,
        date: d.toDateString(),
        time: d.toTimeString(),
      })
      .then((response) => {});

    toast({
      title: "Message sent!",
      description: "Our team is looking into it.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const coords = useSelector((state) => state.coords);

  return (
    <>
      <div className={`${classes.contactBody} contactBody container-fluid`}>
        <div className="row mb-3">
          <div className={`${classes.mapContainer} mapContainer`}>
            <Map />
          </div>
        </div>
        <div className="row">
          <h1 id="top" className="mt-5">
            Contact Us
          </h1>
        </div>
        <div className="row">
          <div className="col-12 col-md mt-5">
            <h2>Points of Contact</h2>
            <div className="row mt-4">
              <h3>Address</h3>
              <p>BITS Pilani, Pilani Campus, Rajasthan-333031</p>
            </div>
            <div className="row mt-4">
              <h3>Web Address</h3>
              <p>
                <a href="https://www.nssbitspilani.org">
                  www.nssbitspilani.org
                </a>
              </p>
            </div>
            <div className="row mt-4">
              <h3>Email Address</h3>
              <p>
                <a href="mailto:nss@pilani.bits-pilani.ac.in">
                  nss@pilani.bits-pilani.ac.in
                </a>
              </p>
            </div>
            <div className="row mt-4">
              <h3>President</h3>
              <p>
                {coords.map((coord) => {
                  if (
                    coord.designation.toUpperCase() ===
                    "President".toUpperCase()
                  )
                    return coord.name;
                })}
                <br />
                Phone: <a href="tel:+919214009746">+91 9214009746</a>
              </p>
            </div>
            <div className="row mt-4">
              <h3>Vice President</h3>
              <p>
                {coords.map((coord) => {
                  if (
                    coord.designation.toUpperCase() ===
                    "Vice President".toUpperCase()
                  )
                    return coord.name;
                })}
                <br />
                Phone: <a href="tel:+917877029904">+91 7877029904</a>
              </p>
            </div>
            <div className="row mt-4">
              <h3>Secretary</h3>
              <p>
                {coords.map((coord) => {
                  if (
                    coord.designation.toUpperCase() ===
                    "Secretary".toUpperCase()
                  )
                    return coord.name;
                })}
                <br />
                Phone: <a href="tel:+919983794877">+91 9983794877</a>
              </p>
            </div>
          </div>
          <div className="col-12 col-md mt-5">
            <div className={`${classes.contactForm} contactForm`}>
              <Form action="#" method="POST" onSubmit={submitHandler}>
                <h2>Leave us a feedback</h2>
                <FormGroup>
                  <label className="row" for="name">
                    <div className={`${classes.inputHead} inputHead`}>Name</div>
                  </label>
                  <Input
                    validations={[required]}
                    className="row ml-0"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({
                        email: formData.email,
                        message: formData.message,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    placeholder="James Bond"
                  />
                </FormGroup>
                <FormGroup>
                  <label className="row" for="email">
                    <div className={`${classes.inputHead} inputHead`}>
                      E-mail
                    </div>
                  </label>
                  <Input
                    validations={[required, email]}
                    className="row ml-0"
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({
                        name: formData.name,
                        message: formData.message,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    placeholder="abc@xyz.com"
                  />
                </FormGroup>
                <FormGroup>
                  <label className="row" for="message">
                    <div className={`${classes.inputHead} inputHead`}>
                      Message
                    </div>
                  </label>
                  <Textarea
                    validations={[required]}
                    className="row ml-0"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({
                        email: formData.email,
                        name: formData.name,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    rows="4"
                    cols="50"
                    placeholder="Hey there, I wanted to say hi and that..."
                  />
                </FormGroup>
                <Button className="button" style={{ marginTop: "1rem" }}>
                  Send message
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contacts;
