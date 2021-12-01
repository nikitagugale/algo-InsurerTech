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

            <td class="data center">123445</td>

            <td class="data center">{{ offer.fac_offer_code }}</td>

            <td class="data center">{{ offer.policyNo }}</td>

            <td class="data center">{{ offer.productName }}</td>

            <td class="data center">{{ offer.riskType }}</td>

            <td class="data center">{{ offer.total_premium }}</td>

            <td class="data center">{{ offer.fac_SI }}</td>

            <td class="data center">{{ offer.fac_premium }}</td>
            <td class="data center" v-if="offer.invest_accept == 1">
              {{ offer.fund / 1000000 }}
            </td>

            <td class="data center" v-else>0</td>

            <td class="data center">
              <label
                v-if="offer.invest_accept == 1"
                @click="
                  selectedOffer = offer;
                  type = 'approve';
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

      offers: [
        {
			invest_accept: 1,
          insurer_address:
            "63U4ORLLXN4JBIMVAPK5LWYOQGIZDYVE3PBR6FE26GNTPEGOOIRFLIV45Q",
          fac_offer_code: 0,
          policyNo: 200,
          productName: "Airplane",
          riskType: "All",
          total_SI: 1000,
          total_premium: 10000,
          fac_SI: 500,
          fac_premium: 100,
        },
      ],

      selectedOffer: {},

      type: "",
    };
  },

  methods: {
    async approveOrRejectFunds() {
      try {
        this.isLoading = true;

        let offer = this.selectedProject;

        let type = this.type;

        let popupTitle =
          type == "reject" ? "Investment rejected" : "Investment approved";

        let popupDesc =
          type == "reject"
            ? "The investment amount has been returned back to the invester."
            : "The investment amount has been credited to your account.";

        let data = {
          "FAC Offer Code": offer.facoffercode,

          "Policy Name": this.policy_name,

          "Product Name": this.product_name,

          "Risk Type": this.risk_type,

          "Total SI": this.total_si,

          "Total Premium": this.total_premium,

          "FAC SI": this.fac_si,

          "FAC Premium": this.face_premium,
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
            creator_address: this.$store.state.account,
          }),
        };

        await fetch(this.$url + "/facofferlist", post)
          .then((response) => response.json())

          .then((data) => {
            this.projects = [];

            data.orderlist.map((p) => {
              if (p.status == 0) {
                this.projects.push(p);
              }
            });
          });
      } catch (err) {
        this.$emit("popup", "", "There was error fetching project data.");
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
