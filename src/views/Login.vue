<template>
  <div class="home" style="height: 100%; width: 100%">
    <v-row justify="center">
      <v-col
        style="
          border: 2px solid #ef6c37;
          background-color: black;
          background-color: rgba(0, 0, 0, 0.5);
          margin-top: 200px;
        "
        cols="12"
        md="4"
        sm="8"
      >
        <img
          style="margin-left: 28%"
          height="100px"
          width="200px"
          src="https://fairplay.club/_nuxt/img/fairplay-website-logo.377fdd9.png"
        />

        <v-row>
          <v-col cols="1" md="1">
            <v-icon class="mt-6">mdi-email</v-icon></v-col
          >
          <v-col cols="11" md="11">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="Email*"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="1" md="1"> <v-icon class="mt-6">mdi-lock</v-icon></v-col>
          <v-col cols="11" md="11">
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              label="Password*"
              @input="$v.password.$touch()"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @blur="$v.password.$touch()"
              placeholder="Password"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <router-link style="text-decoration: none" to="/Login">
              <!-- <v-snackbar color="green" top right v-model="snackbar1">
                {{ text }}
              </v-snackbar> -->
              <!-- <snackbar v-model="snackbar1" /> -->
              <v-btn
                class="v-btn--rounded"
                style="
                  background-color: #ef6c37;
                  color: white;
                  height: 36px;
                  width: 100%;
                "
                @click="submit"
                >Login</v-btn
              >
            </router-link>
          </v-col>
          <v-col cols="12" md="6">
            <!-- <v-btn @click="clear">Clear Form</v-btn> -->
            <v-btn
              @click="clear"
              class="v-btn--rounded"
              style="
                background-color: #ef6c37;
                color: white;
                height: 36px;
                width: 100%;
              "
              >Clear Form</v-btn
            >
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
.v-application .primary--text {
  color: #ef6c37 !important;
  caret-color: #ef6c37 !important;
}
i.v-icon.v-icon {
  color: #ef6c37;
}
</style>
<script>
// import snackbar from "../components/Snackbar.vue";
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
// import { component } from 'vue/types/umd';

export default {
  components: {
    // snackbar,
  },
  data() {
    return {
      items: ["Male", "Female", "I Prefer not to say"],
      // date: "2019-01-01 14:30",
      // snackbar1: false,
      text: ` Login Successfully `,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "",
      email: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("Password must be hard");

      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
  },
  methods: {
    async submit() {
      if (this.$v.dirty) {
        this.$v.$touch();

        return;
      }
      try {
        const obj = {
          email: this.email,
          password: this.password,
        };
        const result = await axios.post("http://localhost:3000/login", obj, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(result);
        // this.snackbar1 = true;
        this.$store.commit("snackbar/setSnackbar", {
          content: "Login successfully done",
          color: "success",
          isVisible: true,
        });
        this.$router.push(`/loginpage`);
      } catch (error) {
        this.$store.commit("snackbar/setSnackbar", {
          content: "Your Login Credentials Is Wrong",
          color: "error",
          isVisible: true,
        });
        console.log(error);
      }
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    },
  },
};
</script>
