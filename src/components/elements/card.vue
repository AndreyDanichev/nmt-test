<template>
	<v-card class="elevation-5 flex d-flex flex-column card">
		<router-link :to="`/${type}/${item.id}`">
			<v-img :src="item.thumbnailUrl" :lazy-src=item.smallThumbnailUrl class="align-end"
				gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" cover>
				<template v-slot:placeholder>
					<v-layout fill-height align-center justify-center ma-0>
						<v-progress-circular indeterminate color="grey lighten-5" />
					</v-layout>
				</template>
				<v-card-title class="text-white">
					<span class="text-h5">{{ item.name }}</span>
				</v-card-title>
			</v-img>
		</router-link>
		<v-card-actions v-if="item.price">
			<span class="h4">{{ item.defaultDisplayedPriceFormatted }} </span>
			<v-spacer />
			<v-btn text @click.stop="addToCart(item)">
				Купить
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>
import cart from '../../helpers/cart'

export default {
	name: 'card-item',
	mixins: [cart],
	props: {
		item: {
			type: Object,
			required: true
		},
		type: {
			type: String,
			default: 'category'
		}
	}
}
</script>
<style scoped>
.text-h5 {
	word-break: normal;
	color: #fff
}
</style>