<nav>
  <a href="/"> Home </a>
  <a href="/about"> About </a>
</nav>

<main>
	<a id="top">&nbsp;</a>
	<slot />
</main>

<script>
  import "../app.postcss";
</script>

<style>
	nav {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		/* NOTE: colors found in src/app.postcss */
		color: var(--menu-text-color);
		background-color: var(--menu-bkg-color);
		margin: 0;
		padding: 5px 0;
		}
	nav a {
		color: var(--menu-text-color);
		text-decoration: none;
		padding: 0;
		}
	nav a:hover {
		color: white;
		}
</style>
