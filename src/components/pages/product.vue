<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<h2>{{ product?.name }}</h2>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" md="4">
				<v-img :src="product?.hdThumbnailUrl" :lazy-src="product?.smallThumbnailUrl" cover>
					<template v-slot:placeholder>
						<v-layout fill-height align-center justify-center ma-0>
							<v-progress-circular indeterminate color="grey lighten-5" />
						</v-layout>
					</template>
				</v-img>
			</v-col>
			<v-col cols="12" sm="7" lg="4" offset-md="1" class="d-flex flex-column justify-space-around">
				<div v-html="product?.description" />
				<div>
					<span class="mr-8">{{ product?.defaultDisplayedPriceFormatted }}</span>
					<v-btn @click="addToCart(product)">Купить</v-btn>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import cart from '../../helpers/cart'

export default {
	name: 'product-page',
	mixins: [cart],
	data: () => ({
		product: undefined
	}),
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$http.get(`/products/${to.params.id}`)
				.then((data) => {
					vm.product = data
				})
		})
	},
	beforeRouteLeave(to, from, next) {
		this.product = undefined
		next()
	}
}
</script>
<style></style>