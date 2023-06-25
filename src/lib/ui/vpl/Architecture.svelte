<sctipt>
</sctipt>


<div class="container-fluid">

  <div class="row">
    <div class="col p-5">

      <div class="card p-2 mb-3">
        <h6 class="card-title text-info">Node &laquo; Writable &laquo; Pojo</h6>
        <div class="card-body">
          <p>node.writable is a writable factory</p>
          <p>node._pojo is what is saved</p>
          <p>node.* are getters/setters that take care of hydration/dehydration of data for and from _pojo</p>
        </div>
      </div>

      <div class="card p-2 mb-3">
        <h6 class="card-title text-info">How saving data works</h6>
        <div class="card-body">

        <div class="row">
          <div class="col p-5">
          <h6 class="card-title text-info">saveMe &raquo; system.patch() &raquo; api.vpl.patch() &raquo; (server response) &raquo; ._pojo update &raquo; getters are returning latest data now &raquo; writables are notified via .set()</h6>

            <p>When using the code editor, a saveMe string is constantly updated, it contains ready to save data.</p>
            <p>This data is meant to be used with the system.patch() command.</p>
            <p>(see below)</p>
          </div>
          <div class="col p-5">
          <h6 class="card-title text-info">By interacting with nodes.</h6>

            <p>When user changes things in the ui, writables will detect it, and apply the new values via node setters</p>
            <p>Setters will transform those values as needed, and update the underlying pojo,</p>
            <p>at this point the POJO can be saved to the server by using the patch command</p>
            <p>(see below)</p>
          </div>
        </div>

        <p>When system.patch api call to the server completes, it will return .data holding the newly updated information</p>
        <p>that information is applied to the node instance as _pojo,</p>
        <p>at this point any getter would use the updated information, because all getters smartly draw data from _pojo, but all the writable instances, still need an updata</p>
        <p>after _pojo is updated, .announce is executed on the node in question, here we .set() all writables! therefore any writables that have been checked out will hear of the change.</p>

        <hr>
        <h6 class="card-title text-info">Loading from server (and merge considerations)</h6>

        <p>To fetch the latest data from server just system.all(), do note that unsaved changes will be lost.</p>
        <p>There is room here for gently pathing data, setters for example serve writables and those tend to be updated/merged</p>

        </div>
      </div>



    </div>

    <div class="col p-5">
      <div class="card p-2">
      <h6 class="card-title text-info">System Layout</h6>

        <ul>
          <li>src/routes/[user]/vpl/+page.svelte</li>
          <ul>
            <li>System()</li>
            <li>Worspace.svelte (src/lib/ui/vpl/Workspace.svelte)</li>
              <ul>
              <li>Create Tabs</li>
              <li>Views.svelte</li>
                <ul>
                <li>nodes</li>
                <li>edges</li>
                <li>Anchors.svelte</li>
                <li>Nodes.svelte</li>
                  <ul>
                  <li>pullable</li>
                    <ul>
                    <li>pull to drop on canvas</li>
                      <ul>
                      <li>as a source (from output)</li>
                      <li>as a destination (from input)</li>
                      </ul>
                    <li>pull to make connection between nodes</li>
                    </ul>
                  <li>draggable</li>
                </ul>
              </ul>
              <li>Commander.svelte</li>
              <li>Configuration.svelte</li>
            </ul>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
ul {
  list-style-type: none;
  border-left: 1px solid var(--bs-dark)
}
</style>
