Vue.component('product', {
    props: ['premium'],
    data() {
        return {
            product: 'Socks',
            selectedVariant: 0,
            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            inventory: 0,
            sizes: ['Extra Large', 'Large', 'Medium', 'Small'],
            variants: [
                {
                    id: 1, 
                    color: 'green', 
                    image: 'vmSocks-green.jpg',
                    quantity: 0
                },
                {
                    id: 2, 
                    color: 'blue', 
                    image: 'vmSocks-blue.jpg',
                    quantity: 10
                }
            ]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        image() {
            return this.variants[this.selectedVariant].image;
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity > 0;
        },
        shipping() {
            if (this.premium) {
                return "Free";
            }
            return 2.99;
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" />
            </div>
            {{ cart }}
            <div class="product-info">
                <h1>{{ product }}</h1>
                <p v-if="inventory > 100">In Stock</p>
                <p v-else-if="inventory < 10 && inventory > 0">Almost Out Stock</p>
                <p :class="{'out-of-stock': !inStock}" v-else>Out Stock</p>
                <p>Shipping: {{ shipping }} </p>
                <div>
                    Sizes:
                    <select>
                        <option disabled>Escolha um item</option>
                        <option v-for="size in sizes" :value="size">{{size}}</option>
                    </select>
                </div>
                <!-- <ul v-for="size in sizes">
                    <li>{{size}}</li>
                </ul> -->
                Colors:
                <ul>
                    <li v-for="(variant, index) in variants" 
                        @mouseover="updateProduct(index)" 
                        class="color-box"
                        :style="{ background: variant.color }"
                        :key="variant.id">
                    </li>
                </ul>
                <br>
                <button @click="addToCart"
                    :class="{ disabledButton: !inStock }" 
                    :disabled="!inStock">Add to Cart</button>
                <button @click="removeFromCart"
                    :class="{ disabledButton: !inStock }" 
                    :disabled="!inStock">Remove Cart</button>
                <a :href="link" target="_blank">More products like this</a>
            </div>
        </div>
    `
})