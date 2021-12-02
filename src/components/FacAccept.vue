<template>
  <section id="approve-reject-funds">
    <h2>ReInsurer Accept</h2>

    <div class="FACOffer">
      <table class="table table-striped" style="overflow: scroll">
        <thead>
          <tr>
			<td class="heading center">Insurer Address</td>

            <td class="heading center">FAC Offer Code</td>

            <td class="heading center">Policy No</td>

            <td class="heading center">Product Name</td>

            <td class="heading center">Risk Type</td>

            <td class="heading center">Total SI</td>

            <td class="heading center">Total Premium</td>

            <td class="heading center">FAC SI</td>

            <td class="heading center">FAC Premium</td>

            <td class="heading center">Amount</td>

            <td class="heading center">Accept</td>
          </tr>
        </thead>

        <tbody>
          <tr v-if="offers == ''">
            <td class="empty" colspan="12">
              You do not have any open FAC Orders.
            </td>
          </tr>
          <!-- <tr> -->
          <tr v-else v-for="(offer, index) in offers" :key="index">
			<td class="data center">{{ offer.insurer_address }}</td>

            <td class="data center">{{ offer.fac_offer_code }}</td>

            <td class="data center">{{ offer.policyNo }}</td>

            <td class="data center">{{ offer.productName }}</td>

            <td class="data center">{{ offer.riskType }}</td>

            <td class="data center">{{ offer.total_SI }}</td>

            <td class="data center">{{ offer.total_premium }}</td>

            <td class="data center">{{ offer.fac_SI }}</td>

            <td class="data center">{{ offer.fac_premium }}</td>

            <td class="data center">{{offer.reinsurer_amount}}</td>

            <!-- <td class="data center" v-if="offer.accept == 1">
            </td>
            <td class="data center" v-else>Accepted</td> -->

            <td class="data center">
              <label
                v-if="offer.accept == 0"
                @click="
                  selectedOffer = offer;
                "
                for="accept-offer"
              >
                <input type="radio" name="accept-offer" />
              </label>
            </td>

            <!-- <td class="data center">
              <label
                v-if="offer.invest_accept == 1"
                @click="
                  selectedOffer = project;
                  type = 'reject';
                "
                for="accept-offer"
              >
                <input type="radio" name="accept-offer" />
              </label>
            </td> -->
          </tr>
        </tbody>
      </table>

      <button
        v-show="offers != ''"
        @click="approveOrRejectFunds"
        class="btn btn-primary"
      >
        <div v-if="!isLoading">Confirm</div>

        <div v-else class="lds-ring">
          <div></div>

          <div></div>

          <div></div>

          <div></div>
        </div>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ApproveRejectFunds",

  data() {
    return {
      isLoading: false,

      offers: [],

      selectedOffer: {},
    };
  },

  methods: {
    async approveOrRejectFunds() {
      try {
        this.isLoading = true;

        let offer = this.selectedOffer;

        let popupTitle =
          // type == "approve" 
           "FAC Accepted";

        let popupDesc =
          // type == "approve"
            // ? "The investment amount has been returned back to the invester."
             "You have accepted the FAC Offer.";

        let data = {
          "Reinsurer_Address": this.$store.state.account,

          "AppID": offer.fac_offer_code,

          "Accept": 1,

          "Token_ID": 48689901,
        };

        let post = {
          mode: "cors",

          method: "POST",

          headers: { "Content-Type": "application/json; charset=UTF-8" },

          body: JSON.stringify(data),
        };

        await fetch(this.$url + "/facaccept", post).then(() => {
          this.$emit("popup", popupTitle, popupDesc);

          this.loadData();
        });
      } catch (err) {
        this.$emit("popup", "", "There was an error.");
        
      }

      this.isLoading = true;
    },

    async loadData() {
      try {
        this.isLoading = true;

        let post = {
          mode: "cors",

          method: "POST",

          headers: { "Content-Type": "application/json; charset=UTF-8" },

          body: JSON.stringify({
            Reinsurer_Address: this.$store.state.account,
          }),
        };

        await fetch(this.$url + "/facofferlist", post)
          .then((response) => response.json())

          .then((data) => {
            this.offers = [];

            data.offer.map((o) => {
              if (o.accept == 0) {
                this.offers.push(o);
              }
            });
          });
      } catch (err) {
        // this.$emit("popup", "", "There was error fetching project data.");
      }

      this.isLoading = false;
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
table {
  margin: 2rem 0;
}

td {
  padding: 0 20px;
}

.data {
  word-break: break-word;

  text-align: left;

  vertical-align: inherit;

  padding: 0.5rem 0;
}

.heading {
  text-align: left;

  font-weight: 600;

  font-size: 1.2rem;
}

.center {
  text-align: center;
}

input[type="radio"] {
  width: 1rem;

  height: 1rem;

  vertical-align: -webkit-baseline-middle;
}

.empty {
  font-size: 1.4rem;
}
</style>
