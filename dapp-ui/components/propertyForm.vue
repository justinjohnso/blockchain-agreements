<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="title"
                  placeholder="Enter Title"
                />
              </div>
              <div class="form-group">
                <label for="content">Content</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="content"
                  placeholder="Document Content"
                />
              </div>
              <div class="form-group">
                <label for="signer_address"
                  >Designated Signer's ETH Address</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="signer_address"
                  placeholder="Signer's ETH address"
                />
              </div>
              <button v-on:click="postDoc" class="btn btn-primary float-right">
                Submit
              </button>
              <!-- <button class="btn btn-outline-secondary float-right mr-3" v-on:click="close">Cancel</button> -->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publishDocument, web3 } from "~/plugins/utils";

export default {
  components: {},
  data() {
    return {
      title: "",
      content: "",
      signer_address: "",
    };
  },
  methods: {
    postDoc() {
      // call utils.publishDocument
      publishDocument(this.title, this.content, this.signer_address);
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
