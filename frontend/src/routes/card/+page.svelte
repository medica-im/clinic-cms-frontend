<script lang="ts">
	import RoundCard from '$lib/components/RoundCard/RoundCard.svelte';
	import {
		Content,
		Grid,
		Row,
		Column,
		Popover,
		Button,
		TooltipDefinition,
		UnorderedList,
		ListItem
	} from 'carbon-components-svelte';
</script>

<Content>
	<Grid padding>
		<Row>
			<Column>
				<RoundCard />
			</Column>
		</Row>
	</Grid>
</Content>
