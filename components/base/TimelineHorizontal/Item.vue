<template>
  <div
    :class="[
      'timeline-status',
      {
        active,
        passed,
      },
    ]"
  >
    <div class="timeline-status-header flex justify-center items-center relative w-full">
      <div
        class="timeline-status-icon rounded-full border-4 border-gray-200 flex items-center justify-center w-14 h-14 bg-white relative z-10 text-gray-200"
      >
        <component :is="icon" />
      </div>

      <div v-if="!noLineLeft" class="timeline-status-line-left h-1 bg-gray-200 w-1/2 absolute left-0 z-0" />
      <div v-if="!noLineRight" class="timeline-status-line-right h-1 bg-gray-200 w-1/2 absolute right-0 z-0" />
    </div>
    <div>
      <p class="timeline-status-title text-sm text-center">{{ title }}</p>
      <p class="timeline-status-time text-black/25 text-xs text-center mt-1">
        {{ time }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  noLine: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  passed: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  noLineLeft: {
    type: Boolean,
    default: false,
  },
  noLineRight: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.timeline-status {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: calc(var(--spacing) * 5) /* 1.25rem = 20px */;
}
.timeline-status.active .timeline-status-icon {
  background-color: var(--color-green-600);
  color: var(--color-white);
  border-color: var(--color-green-600);
}

.timeline-status.active .timeline-status-line-left {
  border-color: var(--color-green-600);
}

.timeline-status.passed .timeline-status-icon {
  border-color: var(--color-green-600);
  color: var(--color-green-600);
}

.timeline-status.passed .timeline-status-line-left,
.timeline-status.passed .timeline-status-line-right {
  background-color: var(--color-green-600);
}
</style>
