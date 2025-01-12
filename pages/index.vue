<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Products</h1>

    <!-- Error Handling -->
    <div v-if="error" class="text-red-500 text-center">
      <p>Failed to load products. Please try again later.</p>
    </div>

    <!-- Loading State -->
    <div v-else-if="status === 'pending'" class="flex justify-center">
      <div class="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        @click="navigateToProductDetails(product)"
        class="border p-4 rounded-lg shadow cursor-pointer"
      >
        <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover rounded-t-lg" />
        <h2 class="text-xl font-semibold mt-4">{{ product.title }}</h2>
        <p class="text-gray-600">{{ product.description }}</p>
        <p class="text-lg font-bold mt-2">${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/global.type";

definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: "/login",
  },
});

const router = useRouter();

const {
  data: products,
  status,
  error,
} = useAsyncData<Product[]>("fetchProducts", () => $fetch("https://fakestoreapi.com/products"));

const navigateToProductDetails = (product: Product) => {
  router.push(`/products/${product.id}`);
};
</script>

<style scoped>
.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 1s ease-in-out infinite;
  animation: spin 1s ease-in-out infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
