<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<h2>Корзина</h2>
			</v-col>
		</v-row>

		<v-row v-for="(item, idx) in cartItems" :key="idx">
			<v-col cols="12" sm="1">
				<v-img :src="item?.smallThumbnailUrl" />
			</v-col>
			<v-col cols="8" sm="4" class="align-self-center">
				<span class="text-h5">
					{{ item?.name }}
				</span>
			</v-col>
			<v-col cols="4" sm="2" class="align-self-center">
				<v-btn @click="deleteOne(idx)">
					Удалить
				</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<v-btn :disabled="!cartItems || !cartItems.length" @click="makeOrder">
					Оформить заказ
				</v-btn>
			</v-col>
		</v-row>
		<v-dialog v-model="dialog" width="auto">
			<v-card>
				<v-card-text>
					<span class="text-h5">текст с поздравлением о покупке:)</span>
				</v-card-text>
				<v-card-actions>
					<v-btn color="primary" block @click="dialog = false">Закрыть</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import { bus } from '../../main'

export default {
	name: 'cart-page',
	data: () => ({
		cartItems: undefined,
		dialog: false
	}),
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.cartItems = JSON.parse(localStorage.getItem('cart'))
		})
	},
	beforeRouteLeave(to, from, next) {
		this.cartItems = undefined
		next()
	},
	methods: {
		deleteOne(idx) {
			this.cartItems.splice(idx, 1)
			localStorage.clear();
			localStorage.setItem('cart', JSON.stringify(this.cartItems))
			bus.$emit("changeCart");
		},
		makeOrder() {
			this.cartItems = undefined
			localStorage.clear();
			bus.$emit("changeCart");
			this.dialog = true
		}
	}
}
</script>
<style></style>