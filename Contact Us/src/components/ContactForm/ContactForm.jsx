import { useState } from "react";
import styles from "./Contact.module.css";
import Button from "../Button/Button";
import { MdMessage } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { HiMail } from "react-icons/hi";
const ContactForm = () => {
  const [name, setname] = useState("Rishab");
  const [email, setemail] = useState("xyz@abc.com");
  const [text, setText] = useState("Ping is too high");

  const onSubmit = (event) => {
    event.preventDefault();

    setname(event.target[0].value);
    setemail(event.target[1].value);
    setText(event.target[2].value);
  };
  return (
    <section className={styles.container}>
      <div className={styles.contact_form}>
        <div className={styles.top_btn}>
          <Button
            text="VIA SUPPORT CHAT"
            icon={<MdMessage fontSize="24px" />}
          />
          <Button text="VIA CALL" icon={<IoIosCall />} />
        </div>
        <Button isOutline={true} text="VIA EMAIL FORM" icon={<HiMail />} />
        <form onSubmit={onSubmit}>
          <div className={styles.form_control}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="text">Text</label>
            <input type="text" name="text" rows="8" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button text="SUBMIT BUTTON" />
          </div>
          <div>{name + " " + email + " " + text} </div>
        </form>
      </div>
      <div className={styles.contact_image}>
        <img src="/images/contact.svg" alt="contact image" />
      </div>
    </section>
  );
};

export default ContactForm;
