<sctipt>
</sctipt>


<div class="container-fluid">

  <div class="row">
    <div class="col p-5">
      <div class="card">
        Node &laquo; Writable &laquo; Pojo
        <div class="card-body">
          <p>node.writable is a writable factory</p>
          <p>node._pojo is what is saved</p>
          <p>node.* are getters/setters that take care of hydration/dehydration of data for and from _pojo</p>
        </div>
      </div>
    </div>

    <div class="col p-5">
      <div class="card">
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
