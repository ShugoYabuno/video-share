import Vue from "vue"

export const customUtil = {
  methods: {
    async redirectCheckUser() {
      if (!process.client) return
      let vuex = JSON.parse(localStorage.getItem("vuex")) || {}
      if (!vuex) return
      if (!vuex.isSigned) this.$router.push("/")
      return
    },
    async confirmDialog(_message) {
      let isProceed = await this.$dialog.confirm({
        title: _message,
      },{
        okText: "はい",
        cancelText: "いいえ",
      })
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
      return isProceed
    },
  }
}

Vue.mixin(customUtil)
