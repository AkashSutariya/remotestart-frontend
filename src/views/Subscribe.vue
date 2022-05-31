<template>
  <div class="container mx-auto">
    <div class="flex justify-center items-center mt-52">
      <div class="w-full max-w-xs">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="text-left mb-4">
            <label
              for="website"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Website:
            </label>
            <select
              id="website"
              class="bg-white shadow border-rounded w-full py-1 px-3 text-gray-700"
              v-model="form.website"
            >
              <option :value="null" :disabled="true">Please Select</option>
              <option v-for="website in websites" :key="website.id" :value="website.id" >
                {{ website.name }}
              </option>
            </select>
            <span v-for="(error, index) in errors.website" :key="index" class="text-xs text-red-700">
              {{ error }}
            </span>
          </div>
          <div class="text-left mb-4">
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:</label
            >
            <input
              id="email"
              class="shadow w-full py-2 px-3 text-gray-700"
              type="text"
              placeholder="Email"
              v-model.trim="form.email"
            />
            <span v-for="(error, index) in errors.email" :key="index" class="text-xs text-red-700">
              {{ error }}
            </span>
          </div>
          <button
            class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded"
            @click="subscribe"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { STATUSES, MESSAGES } from '../axios/httpcode'
import { AxiosError, AxiosResponse } from 'axios';

interface SubscribeForm {
  website: number | null,
  email: string,
}

interface SubscribeFormError {
  email?: Array<string>,
  website?: Array<string>,
}

@Component({})
export default class SubscribeView extends Vue {

  private form: SubscribeForm;
  private errors: SubscribeFormError;

  constructor() {

    super();

    this.form = this.initializeForm();
    this.errors = {};
  }

  get websites(): Array<object> {
    return this.$store.state.websites;
  }

  public initializeForm(): SubscribeForm {
    return {
      email: '',
      website: null,
    }
  }

  public getWebsites(): void {
    this.$store.dispatch('fetchWebsites')
  }

  public subscribe(): void {
    this.$store.dispatch('subscribe', this.form).then((response: AxiosResponse) => {
      if (response.status === STATUSES.CREATED && response.statusText === MESSAGES.CREATED) {
        this.form = this.initializeForm();
        this.errors = {};
        this.$notify({
          text: 'Successfully Subscribed',
          type: 'success',
        });
      }
    }).catch((error: AxiosError) => {
      if (error.response?.status === STATUSES.VALIDATION_FAILED && error.response.statusText === MESSAGES.VALIDATION_FAILED) {
        // eslint-disable-next-line
        const errorData = error.response.data as any;
        this.errors = errorData.errors;
      } else {
        this.$notify({
          text: 'Network Error',
          type: 'error',
        });
      }
    });
  }

  created (): void {
    this.getWebsites();
  }
}
</script>
