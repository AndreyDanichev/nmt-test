<template>
	<v-dialog
		v-model="show"
		v-if="show"
		width="800"
	>
		<v-form ref="reg-form" lazy-validation>
			<v-card>
				<v-card-title primary-title class="justify-center">
					<span class="text-h5">Введите данные для регистрации</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12" sm="4">
								<v-text-field
									label="Фамилия*"
									v-model="user.surname"
									:rules="[rules.required, rules.counter]"
									required
								/>
							</v-col>
							<v-col cols="12" sm="4" >
								<v-text-field
									label="Имя*"
									v-model="user.name"
									:rules="[rules.required, rules.counter]"
									required
								/>
							</v-col>
							<v-col cols="12" sm="4">
								<v-text-field
									label="Отчество"
									v-model="user.patronymic"
									:rules="[rules.counter]"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="6" md="4">
								<v-text-field
									label="Email*"
									v-model="user.email"
									:rules="[rules.required, rules.email]"
									required
								/>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-menu
									v-model="datePicker"
									:close-on-content-click="true"
									:nudge-right="20"
									transition="scale-transition"
									offset-y
									max-width="290px"
									min-width="290px"
								>
									<template v-slot:activator="{ on }">
										<v-text-field
											label="Дата рождения*"
											:value="user.birthdate"
											:rules="[rules.required, rules.date]"
											readonly
											v-on="on"
											required
										/>
									</template>
									<v-date-picker
										locale="ru-ru"
										v-model="user.birthdate"
										no-title
										@input="fromDateMenu = false"
										:max="maxDate"
									/>
								</v-menu>
							</v-col>
							<v-col cols="12" md="4">
								<v-radio-group label="Пол" row v-model="user.sex" :mandatory="true">
									<v-radio label="М" value="male" />
									<v-radio label="Ж" value="female" />
								</v-radio-group>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="6">
								<v-select
									label="Группа клиентов"
									:items="['VIP', 'Проблемные', 'ОМС']"
									v-model="user.group"
								/>
							</v-col>
							<v-col cols="12" sm="6">
								<v-checkbox label="Не отправлять СМС" v-model="user.disallowMessage"/>
							</v-col>
						</v-row>
						<small>* - обязательное поле</small>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn
						color="blue-darken-1"
						variant="text"
						@click="regAction"
						:loading="loading"
					>
						Зарегистрировать
					</v-btn>
					<v-spacer />
				</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
</template>

<script>
import validation from '../helpers/validation.js'

export default {
	mixins: [validation],
	props: {
		value: {
			type: Boolean
		}
	},
	data: () => ({
		loading: false,
		datePicker: false,
		maxDate: new Date().toISOString().split('T')[0],
		user: {
			surname: undefined,
			name: undefined,
			patronymic: undefined,
			email: undefined,
			birthdate: undefined,
			sex: 'male',
			group: undefined,
			disallowMessage: false
		}
	}),
	computed: {
		show: {
			get () {
				return this.value
			},
			set (value) {
				this.$emit('input', value)
			}
		},
	},
	methods: {
		regAction () {
			if (!this.$refs['reg-form'].validate()) {
				this.loading = true
				this.$http.get('categories')
					.then(res => console.log(res.data))
					.catch(e => console.log(e.message))
					.finally(() => this.loading = false)
			}
		}
	}
}
</script>
<style>
.text-h5 {
	word-break: normal;
	text-align: center;
}
</style>
