<script lang="ts">
	import LL from '$i18n/i18n-svelte';
</script>

<div class="container m-3">
	<div class="d-flex align-items-center justify-content-center">
		<div class="text-center">
			<h1 class="display-1 fw-bold">404</h1>
			<p class="fs-3">
				<span class="text-danger">{$LL.ERROR404.OOPS()}</span>
				{$LL.ERROR404.PAGENOTFOUND()}
			</p>
			<p class="lead">
				{$LL.ERROR404.DOESNOTEXIST()}
			</p>
			<a href="/" class="btn btn-light">{$LL.ERROR404.HOME()}</a>
		</div>
	</div>
</div>
