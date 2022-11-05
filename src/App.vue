<template>
  <div class="tables">
    <a
      href="https://github.com/mayflaua/ks"
      class="link"
    >Source code</a>
    <h2>Задача 1</h2>
    <h4>Форма строится динамически по данным из XML</h4>
    <TaskOne />

    <h2>Задача 2</h2>
    <h4>Форма привязана к объекту, структура на основе данных из XML</h4>
    <TaskTwo />
  </div>
</template>

<script setup>
import TaskOne from '@/components/TaskOne'
import TaskTwo from '@/components/TaskTwo'


</script>

<style>
.tables {
  max-width: 1200px;
  margin: 0 auto;
}

.link {
  font-size: 1.2rem;
}
</style>
