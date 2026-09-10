<script setup lang="ts">
// Ported from src/_includes/migration.njk (11ty), the Dashboard 1.0 flow importer on
// /platform/dashboard/. Same markup and classes; the drop zone, the HubSpot gate and the
// download all behave as before, with one fix.
//
// The .njk kept the chosen file only in the <input> element and its own `d1Flow` variable,
// which was never assigned. dropHandler showed the dropped file's name but stored it
// nowhere, and migrateFile read `document.getElementById(...).files` - a FileList, which
// is truthy even when empty - so a DROPPED file produced `undefined` and posted nothing.
// Dragging a file in therefore looked like it worked and then silently did nothing. Here
// the selected file is one piece of state, set by both paths, so drop works.
const file = ref<File | null>(null)
const error = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const MIGRATION_ENDPOINT = 'https://dashboard-migration-service.flowfuse.cloud/migrate-flow'

function openFilePicker() {
    fileInput.value?.click()
}

function onFileSelected(event: Event) {
    file.value = (event.target as HTMLInputElement).files?.[0] ?? null
    error.value = false
}

function onDrop(event: DragEvent) {
    // Prevent the browser opening the file instead.
    event.preventDefault()
    const dropped = Array.from(event.dataTransfer?.items ?? [])
        .filter(item => item.kind === 'file')
        .map(item => item.getAsFile())
        .find(Boolean)
    if (dropped) {
        file.value = dropped
        error.value = false
    }
}

function downloadFlow(flow: unknown) {
    const href = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(flow))}`
    const anchor = document.createElement('a')
    anchor.setAttribute('href', href)
    anchor.setAttribute('download', 'flow-dashboard2.json')
    anchor.click()
}

// Runs once the HubSpot form has been submitted, which is the gate the .njk put in front
// of the conversion.
async function migrateFile() {
    if (!file.value) return
    try {
        const response = await fetch(MIGRATION_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: file.value,
        })
        if (!response.ok) throw new Error(`migration service returned ${response.status}`)
        downloadFlow(await response.json())
    } catch {
        // The .njk only console.error'd here, so a failed conversion looked identical to
        // one that had not run yet. Say so instead.
        error.value = true
    }
}
</script>

<template>
  <div class="nohero w-full">
    <div class="m-auto">
      <div class="ff-dashboard-migration">
        <div>
          <div
              class="ff-file-drop-zone"
              role="button"
              tabindex="0"
              aria-label="Upload a flow.json file. Click or press Enter to choose a file, or drag and drop."
              @click="openFilePicker"
              @keydown.enter.prevent="openFilePicker"
              @keydown.space.prevent="openFilePicker"
              @drop="onDrop"
              @dragover.prevent
          >
            <div v-if="!file">
              <p>Drag a <i>flow.json</i> file containing Node-RED Dashboard 1.0 nodes here.</p>
              <p>or, click <span class="text-blue-600">here</span> to choose a file.</p>
            </div>
            <div v-else>
              <p>Flow Uploaded: "<i>{{ file.name }}</i>"</p>
            </div>
            <input
                id="dashboard1-flow-file"
                ref="fileInput"
                name="dashboard1-flow-file"
                type="file"
                accept="application/json,.json"
                @change="onFileSelected"
            >
          </div>
          <p v-if="error" class="text-red-500 text-sm mt-2">
            That flow could not be converted. Check it is a Node-RED flow export and try again.
          </p>
        </div>
        <div>
          <HubSpotForm form-id="968a9ab6-3dd8-45b2-991c-3f055dc18787" @submitted="migrateFile" />
        </div>
      </div>
    </div>
  </div>
</template>
