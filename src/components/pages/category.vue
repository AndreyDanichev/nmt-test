<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<h2 v-if="category">Товары в категории {{ category?.name }}</h2>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" sm="2" v-for="item in products?.items" :key="item.id">
				<Card :item="item" type="product" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>

export default {
	name: 'category-page',
	components: {
		Card: () => import('../elements/card.vue')
	},
	data: () => ({
		category: undefined,
		products: undefined
	}),
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$http.get(`/categories/${to.params.id}`)
				.then((data) => {
					vm.category = data
				})

			vm.$http.get(`/products?categories=${to.params.id}&includeProductsFromSubcategories=true`)
				.then((data) => {
					vm.products = data
				})
		})
	},
	beforeRouteLeave(to, from, next) {
		this.category = undefined
		this.products = undefined
		next()
	},
	methods: {
		getData() {

		}
	}
}
</script>
<style></style>