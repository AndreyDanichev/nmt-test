<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<h2>Категории</h2>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" sm="3" lg="2" v-for="card in categories.items" :key="card.id">
				<Card :item="card" />
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<h2>Товары</h2>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" sm="4" lg="2" v-for="item in products?.items" :key="item.id">
				<Card :item="item" type="product" />
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	name: 'main-page',
	components: {
		Card: () => import('../elements/card.vue')
	},
	data() {
		return {
			categories: [],
			products: []
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		async getData() {
			const [categories, products] = await Promise.all([
				this.$http.get('categories'),
				this.$http.get('products')
			])
			this.categories = categories
			this.products = products
		}
	}
}
</script>
<style></style>