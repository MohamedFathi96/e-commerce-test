<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Product Details</h1>

    <!-- Error Handling -->
    <div v-if="error" class="text-red-500 text-center">
      <p>Failed to load product details. Please try again later.</p>
    </div>

    <!-- Loading State -->
    <div v-else-if="status === 'pending'" class="flex justify-center">
      <div class="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
    </div>

    <!-- Product Details -->
    <div v-if="status === 'success'" class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img :src="product!.image" :alt="product!.title" class="w-full h-96 object-contain">
      <div class="p-6">
        <h2 class="text-3xl font-bold mb-4">{{ product!.title }}</h2>
        <p class="text-gray-700 text-lg mb-6">{{ product!.description }}</p>
        <p class="text-2xl font-semibold mb-4">Price: ${{ product!.price }}</p>
        <button class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">Add to Cart</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product } from '~/types/global.type';


const route = useRoute();
const productId = route.params.id;

const { data: product,status, error } = useAsyncData<Product>('fetchProductDetails', () => $fetch(`https://fakestoreapi.com/products/${productId}`));

</script>

<style scoped>

</style>