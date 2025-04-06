<script lang="ts">
	import * as m from "$msgs";</script>

<div class="container m-3">
	<div class="d-flex align-items-center justify-content-center">
		<div class="text-center">
			<h1 class="display-1 fw-bold">404</h1>
			<p class="fs-3">
				<span class="text-danger">{m.ERROR404_OOPS()}</span>
				{m.ERROR404_PAGENOTFOUND()}
			</p>
			<p class="lead">
				{m.ERROR404_DOESNOTEXIST()}
			</p>
			<a href="/" class="btn btn-light">{m.ERROR404_HOME()}</a>
		</div>
	</div>
</div>
