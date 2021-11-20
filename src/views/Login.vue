<template>
  <section id="loginSection" class="hero is-light is-bold is-fullheight">
    <div class="hero-body">
      <div class="login-container">
        <div class="login-form">
          <div class="box">
            <b-tabs position="is-centered" class="block loginRegTabs">
              <b-tab-item label="Bejelentkezés">
                <form id="login-form" @submit.prevent="onLoginSubmit">
                  <b-field label="Felhasználónév" expanded>
                    <b-input v-model="form.username" icon="user" type="text" id="loginUsername" rounded></b-input>
                  </b-field>
                  <b-field label="Jelszó" expanded>
                    <b-input v-model="form.password" icon="lock" type="password" id="loginPassword" rounded password-reveal></b-input>
                  </b-field>
                  <b-button type="is-primary" native-type="submit" expanded rounded>Bejelentkezés</b-button>
                </form>
              </b-tab-item>
              <b-tab-item label="Regisztráció">
                <form id="reg-form" @submit.prevent="onRegSubmit">
                  <b-field label="Felhasználónév" min="5" expanded>
                    <b-input v-model="regForm.username" icon="user" type="text" id="regUsername" validation-message="A felhasználónév legalább 5 karakter kell, hogy legyen!" minlength="5" required rounded></b-input>
                  </b-field>
                  <b-field label="Jelszó" expanded>
                    <b-input v-model="regForm.password" icon="lock" type="password" id="regPassword" required rounded password-reveal></b-input>
                  </b-field>
                  <b-field label="Jelszó újra" expanded :type="{ 'is-danger': passwordMatchCheck }" :message="{ 'A két jelszó nem egyezik': passwordMatchCheck }">
                    <b-input v-model="passwordRepeat" icon="lock" type="password" id="passwordRepeat" required rounded password-reveal></b-input>
                  </b-field>
                  <b-button type="is-primary" native-type="submit" :disabled="!usernameFilled || usernameLengthValid || passwordMatchCheck || !passwordsFilled" expanded rounded>Regisztráció</b-button>
                </form>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
    <b-loading :active="loading"></b-loading>
  </section>
</template>

<script>


export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      regForm: {
        username: '',
        password: ''
      },
      passwordRepeat: '',
      loading: false
    }
  },
  methods: {
    async onLoginSubmit() {
      this.loading = true;
      this.form.username = this.form.username.toLowerCase().trim();
      try {
        await this.$store.dispatch("login", this.form)
        console.log(localStorage.getItem('token'))
        console.log(this.$store.getters.getToken)
        if(this.$store.getters.isLoggedIn){
          this.$buefy.toast.open({
            message: "A bejelentkezés sikeres",
            type: 'is-success'
          })
          return this.$router.push({
            path: '/dashboard'
          })
        }else{
          this.$buefy.toast.open({
            message: "A felhasználónév/jelszó nem megfelelő",
            type: 'is-danger'
          })
        }
      } catch (e) {
        this.$buefy.toast.open({
          message: "A bejelentkezés sikertelen",
          type: 'is-danger'
        })
      } finally {
        this.loading = false;
      }
    },
    async onRegSubmit(){
      this.loading = true;
      this.regForm.username = this.regForm.username.toLowerCase().trim()
      try{
        await this.$store.dispatch("register", this.regForm);
        if(this.$store.getters.isLoggedIn){
          this.$buefy.toast.open({
            message: "A regisztráció sikeres",
            type: 'is-success'
          })
          return this.$router.push('/dashboard');
        }else{
          if(this.$store.getters.getRegisterState === 'RESERVED'){
            this.$buefy.toast.open({
              message: "A felhasználó már foglalt.",
              type: 'is-danger'
            })
          }else{
            this.$buefy.toast.open({
              message: "A regisztráció sikertelen. A szerveren ismeretlen hiba történt.",
              type: 'is-danger'
            })
          }
        }
      } catch (e) {
          this.$buefy.toast.open({
            message: "A regisztráció sikertelen. Ismeretlen hiba történt.",
            type: 'is-danger'
          })
      } finally {
        this.loading = false;
      }

    }
  },
  computed: {
    passwordMatchCheck () {
      if(this.passwordsFilled) {
        return (this.regForm.password !== this.passwordRepeat)
      }else {
        return false;
      }
    },
    usernameLengthValid () {
      if(this.usernameFilled) {
        return (this.regForm.username.length < 5)
      }else {
        return false;
      }
    },
    passwordsFilled () {
      return (this.regForm.password !== '' && this.passwordRepeat !== '');
    },
    usernameFilled () {
      return (this.regForm.username !== '')
    },
  },
  mounted() {

  }
}
</script>

<style lang="scss">
    @import "../style/custom.scss";
</style>