<template>
  <div class="container">
    <br>
    <hr>
    <div class="textContainer" variant="dark">
      <b-form @submit="onSubmit" v-if="show">
        <h4>Feedback</h4>
        <br>
        <b-form-group id="input-group-3" label="Issue:" label-for="input-3">
          <b-form-select id="input-3" v-model="form.subject" :options="subjects" required></b-form-select>
        </b-form-group>
        <label for="textarea-small">Description:</label>
        <b-form-textarea
          id="textarea"
          v-model="form.msg"
          placeholder="What's keeping you awake at night?"
          rows="3"
          required
          max-rows="6"
        ></b-form-textarea>
        <br>

        <b-button type="submit" variant="primary">Send</b-button>
      </b-form>
      <div v-if="!show">
        <h4 class="text-center">Thanks for your feedback!</h4>
      </div>

      <br>
    </div>
  </div>
</template>

<script>
import * as emailjs from "emailjs-com";
export default {
  data() {
    return {
      form: {
        subject: null,
        msg: ""
      },
      subjects: [
        { text: "Select One", value: null },
        "Car missing",
        "Wrong specs",
        "Error or bug",
        "Other"
      ],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.sendEmail();
    },
    sendEmail() {
      this.show = false;
      const fields = {
        subject: this.form.subject,
        msg: this.form.msg
      };
      emailjs.send("gmail", "template_id", fields, "your_emailjs_user_id").then(
        response => {
          console.log("SUCCESS!", response.status, response.text);
        },
        err => {
          console.log("FAILED...", err);
        }
      );
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 50px;
  min-height: 100vh;
  background-color: white;
}
p {
  font-size: 1.2em;
}
.textContainer {
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 15px;
}
</style>
