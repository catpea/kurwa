<script>
	export let data;

	async function carousel(node){
		const { Carousel } = await import('bootstrap/dist/js/bootstrap.esm.min.js');
		const carousel = new Carousel(node, {
		  interval: 5000,
		})


	}
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>


<div class="container-fluid">
	<div class="row">
		<div class="col-2">
		</div>
		<div class="col-7">
		</div>
		<div class="col-3">


<div id="carouselExample" class="carousel slide carousel-fade" data-bs-ride="carousel" use:carousel>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/files/meow/1/1/1.jpg" class="d-block w-100" alt="...">
			<div class="carousel-caption d-none d-md-block">
		<h5>First slide label</h5>
		<p>Some representative placeholder content for the first slide.</p>
	</div>

    </div>
    <div class="carousel-item">
      <img src="/files/meow/1/1/2.jpg" class="d-block w-100" alt="...">
			<div class="carousel-caption d-none d-md-block">
		<h5>Second slide label</h5>
		<p>Some representative placeholder content for the first slide.</p>
	</div>

    </div>
    <div class="carousel-item">
      <img src="/files/meow/1/1/3.jpg" class="d-block w-100" alt="...">
			<div class="carousel-caption d-none d-md-block">
		<h5>Third slide label</h5>
		<p>Some representative placeholder content for the first slide.</p>
	</div>

    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


</div>
</div>
</div>
