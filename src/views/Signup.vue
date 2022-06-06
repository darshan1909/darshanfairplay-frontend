<template>
  <div class="home" style="height: 100%; width: 100%">
    <v-row justify="center">
      <v-col
        class="mt-5"
        style="
          border: 2px solid #ef6c37;
          background-color: black;
          background-color: rgba(0, 0, 0, 0.5);
        "
        cols="12"
        md="4"
        sm="12"
      >
        <img
          style="margin-left: 28%"
          height="100px"
          width="200px"
          src="https://fairplay.club/_nuxt/img/fairplay-website-logo.377fdd9.png"
        />
        <v-row>
          <v-col cols="1" md="1"
            ><v-icon class="mt-6">mdi-account</v-icon></v-col
          >
          <v-col cols="11" md="11">
            <v-text-field
              class="text"
              v-model="name"
              :error-messages="nameErrors"
              :counter="10"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              label="Name*"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" md="1">
            <v-icon class="mt-6">mdi-email</v-icon></v-col
          >
          <v-col cols="11" md="11">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="Email*"
              type="email"
              class="mt-2"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" md="1">
            <v-icon class="mt-6">mdi-cellphone</v-icon></v-col
          >
          <v-col cols="11" md="11">
            <v-text-field
              v-model="number"
              @keypress="validateNumber"
              onKeyPress="if(this.value.length>=10) return false;"
              :error-messages="numberErrors"
              @input="$v.number.$touch()"
              @blur="$v.number.$touch()"
              label="Mobile Number*"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" md="1">
            <v-icon class="mt-6">mdi-calendar</v-icon>
          </v-col>
          <v-col cols="5" md="5">
            <div>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    :error-messages="dateErrors"
                    @input="$v.date.$touch()"
                    @blur="$v.date.$touch()"
                    required
                    label="Birth Date*"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :active-picker.sync="activePicker"
                  :max="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="1" md="1">
            <v-icon class="mt-6">mdi-account-group</v-icon>
          </v-col>
          <v-col cols="5" md="5">
            <v-select
              v-model="gender"
              :error-messages="genderErrors"
              @input="$v.gender.$touch()"
              @blur="$v.gender.$touch()"
              :items="items"
              label="Select Gender*"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" md="1"> <v-icon class="mt-6">mdi-lock</v-icon></v-col>
          <v-col cols="11" md="11">
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password*"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              counter
              required
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="4" md="1"> <v-icon>mdi-lock</v-icon></v-col>
          <v-col cols="4" md="11">
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirm Password*"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col cols="12" md="12">
            <v-btn
              @click="submit"
              class="v-btn--rounded"
              style="
                background-color: #ef6c37;
                color: white;
                height: 36px;
                width: 100%;
              "
              >Register</v-btn
            >
            <!-- <v-snackbar color="green" top right v-model="snackbar">
              {{ text }}
            </v-snackbar> -->
            <v-btn
              @click="clear"
              class="v-btn--rounded mt-3"
              style="
                background-color: #ef6c37;
                color: white;
                height: 36px;
                width: 100%;
              "
              >Clear Form</v-btn
            >
            <div class="mt-5 d-flex justify-center">
              Already a member? &nbsp;
              <router-link style="text-decoration: none" to="/Login">
                <v-btn
                  style="background-color: #ef6c37; color: white; height: 36px"
                  >Login</v-btn
                >
              </router-link>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped>
.home {
  background-image: url(https://fairplay-image.fairplay.club/drop.png);
  background-size: cover;
}
.datepic {
  width: 100%;
  height: 100%;
}
.v-application .primary--text {
  color: #ef6c37 !important;
  caret-color: #ef6c37 !important;
}
i.v-icon.v-icon {
  color: #ef6c37;
}
</style>
<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      activePicker: null,
      // snackbar: false,
      text: ` Account Created Succesfully `,
      items: ["Male", "Female", "I Prefer not to say"],
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      date: null,
      password: "",
      // confirmpassword: "",
      menu: false,
      name: "",
      number: "",
      gender: "",
      email: "",
    };
  },
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    number: { required },
    gender: { required },
    date: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    // confirmpassword: { required, minLength: minLength(8) },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    numberErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) return errors;
      !this.$v.number.required && errors.push("Mobile Number is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    numerror() {
      const errors = [];
      if (!this.$v.number.$dirty) return errors;
      !this.$v.number.required && errors.push("Phone Number is required.");
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.gender.$dirty) return errors;
      !this.$v.gender.required && errors.push("Gender is required.");
      return errors;
    },
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required && errors.push("Date is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("Password must be hard");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    // confirmErrors() {
    //   const errors = [];
    //   if (!this.$v.confirmpassword.$dirty) return errors;
    //   !this.$v.confirmpassword.minLength && errors.push("Confirm Password must be hard");
    //   !this.$v.confirmpassword.required && errors.push("Confirm Password is required.");
    //   return errors;
    // },
  },
  methods: {
    validateNumber: (event) => {
      let keyCode = event.keyCode;
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
    },
    async submit() {
      this.$v.$touch();
      try {
        const obj = {
          name: this.name,
          email: this.email,
          phone_no: this.number,
          date: this.date,
          gender: this.gender,
          password: this.password,
        };
        const result = await axios.post("http://localhost:3000/signup", obj, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(result);
        this.$store.commit("snackbar/setSnackbar", {
          content: "Register Done Successfully",
          color: "success",
          isVisible: true,
        });
        // this.$router.push(`/loginpage`);
      } catch (error) {
        console.log(error);
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    // submit() {
    //   this.$v.$touch();
    // },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.number = "";
      this.date = "";
      this.gender = "";
      this.password = "";
    },
  },
};
</script>
