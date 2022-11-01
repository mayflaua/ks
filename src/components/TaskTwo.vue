<template>
  <form class="task-2">
    <div
      class="table"
      :style="{columnGap: res.margin}"
    >
      <div class="labels">
        <label
          v-for="label in res.rows.slice(0, res.rows.length - 1).map(i => i[0])"
          :class="{'label--required': label['required']}"
          :key="label"
        >{{ label.labelText }}</label>
      </div>

      <div class="rows">
        <div
          class="row"
          v-for="row in res.rows.slice(0, res.rows.length - 1)"
          :key="row"
        >
          <div
            :key="cell"
            class="cell"
            v-for="(cell, i) in row"
            :class="
              {'cell--extendright': cell['extendtoright'],
               'cell--moveright': cell['movetoright'],
               'cell--label-left': cell.label === 'left',
               'cell--label-top': cell.label === 'top'
              }"
          >
            <label
              :for="cell.code"
              :class="{'label--required': cell['required']}"
              v-if="i!==0 && cell.label"
            >{{ cell.labelText }}</label>
            <input
              :title="!cell.label ? cell.labelText : null"
              :required="cell.required"
              :type="cell.type"
              :name="cell.code"
              :list="cell.suggestions ? 'suggestions': null"
              maxlength="80"
              @change="handleInputChangeEvent"
              v-model="form[cell.alias][cell.field]"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div
        class="head-cell"
        v-for="cell in res.grid"
        :key="cell"
      >
        {{ cell }}
      </div>
      <div
        class="grid-cell"
        v-for="cell in 5"
        :key="cell"
      >
        {{ cell }}
      </div>
    </div>

    <datalist id="suggestions">
      <option
        :value="Object.keys(sug)[0]"
        v-for="sug of res.suggestionsList"
        :key="sug"
      >
        {{ Object.values(sug)[0] }}
      </option>
    </datalist>
    <pre>{{ form }}</pre>
    {{ }}
  </form>
</template>

<script setup>
import {reactive} from "vue";

const handleInputChangeEvent = (e) => {
  if (e.target.attributes.list && res.suggestionsList.map(i => Object.keys(i)[0]).includes(e.target.value)) {
    form["1"].corr1_n = res.suggestionsList.find(o => o[e.target.value])[e.target.value]
  }
}
import parseXML from "@/helpers/parse";

const form = reactive({
  "1": {},
  "2": {}
})

const xhr = new XMLHttpRequest()
xhr.open('get', 'data.xml', false)
xhr.send()
const res = parseXML(xhr.responseXML)
</script>

<style scoped>
.table {
  display: grid;
  grid-template-columns: auto 1fr;
  flex-direction: column;
}

input {
  padding: 4px 6px;
  background-color: #cccccc30;
}
input[required] {
  background-color: lightyellow;
}

.labels {
  display: flex;
  flex-direction: column;
}
.labels label {
  height: 30px;
  display: flex;
  align-items: center;
}
.label--required:after {
  content: '*';
  color: red;
}

.row {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  height: 30px;
  align-items: center;
}

.cell {
  display: flex;
  gap: 6px;
  align-items: center;
}
.cell--label-top {
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}
.cell--moveright {
  margin-left: auto;
}
.cell--extendright {
  flex-grow: 1;
}
.cell--extendright input {
  flex-grow: 1;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 3fr 6fr 8fr 8fr;
  border: 1px solid lightsteelblue;
  max-width: 1200px;
  margin: 0 auto;
}
.head-cell {
  background-color: #0000ff10;
}
.head-cell:first-child {
  text-align: center;
}
.grid-cell:nth-child(n+1) {
  text-align: right;
}
.head-cell, .grid-cell {
  border-right: 1px solid lightsteelblue;
  padding: 3px 5px;
}
</style>
