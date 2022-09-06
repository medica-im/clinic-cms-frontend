<script lang="ts">
  import { variables } from '$lib/utils/constants';
	import Card, { Content, ActionButtons, ActionIcons, Actions, PrimaryAction, Media, MediaContent } from '@smui/card';
	import List, { Item, Graphic, Text, PrimaryText, SecondaryText } from '@smui/list';
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
  import Appointment from './Appointment.svelte';
	export let workerData;


    function getStyle() {
        let ppUrl='/default_profile_picture.png';
        if ( workerData.profile_picture_url ) {
            ppUrl = workerData.profile_picture_url;
        }
        let style =  ` --url: url("${ppUrl}");`
        return style
    }
    function getUrl() {
        if ( !workerData.profile_picture_url ) {
            return `${variables.BASE_URI}/media/profile_images/default_profile_picture.png`
        }
        return variables.BASE_URI + workerData.profile_picture_url

    }
</script>

<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="{getUrl()}" class="img-fluid rounded-start" alt="profile">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{workerData.formatted_name}</h5>
        <ul class="list-group list-group">
          {#each workerData.occupations as occupation}
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">{occupation.label}</div>
              {#if occupation.specialty}
									Spécialité: {occupation.specialty.label}
								{/if}
            </div>
          </li>
					{/each}
        </ul>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <ul class="list-group list-group">
        {#if workerData.account_email}

        <p class="card-text"><small class="text-muted">{ workerData.account_email }</small></p>

        
        {/if}

        {#if workerData.phone_numbers}
        {#each Object.keys(workerData.phone_numbers) as key}
        {#each  workerData.phone_numbers[key] as phone}
        <li class="list-group-item d-flex justify-content-between align-items-start">
        <p class="card-text"><small class="text-muted">{ key }: { phone }</small></p>
        </li>
        {/each}
        {/each}
        {/if}

        {#if workerData.websites}
        {#each  workerData.websites as website}
        <li class="list-group-item d-flex justify-content-between align-items-start">
        <small><a href="{website.url}" class="card-link text-muted">{website.url}</a> [{website.type}]</small>
        </li>
        {/each}
        {/if}
        {#if workerData.appointments}
        <Appointment appointments={workerData.appointments}/>
{/if}
        </ul>
      </div>
    </div>
  </div>
</div>
<!--div class="card-container">
	<Card>
        <Media class="card-media-square" aspectRatio="square">
            <MediaContent>
			<h2 class="mdc-typography--headline6">
				{workerData.formatted_name}
			</h2>
			<h3 class="mdc-typography--subtitle2">
				<List twoLine nonInteractive>
					{#each workerData.occupations as occupation}
						<Item>
							<Text>
								<PrimaryText>{occupation.label}</PrimaryText>
								{#if occupation.specialty}
									<SecondaryText>Spécialité: {occupation.specialty.label}</SecondaryText>
								{/if}
							</Text>
						</Item>
					{/each}
				</List>
			</h3>
            </MediaContent>
		<Media/>
		<Content class="mdc-typography--body2">
			And some info text. And the media and info text are a primary action for the card.
		</Content>
	</Card>
</div-->
<!--div class="card-display">
    <div class="card-container">
        <Card>
          <PrimaryAction on:click={() => clicked++}>
            <div class="card-image" style="background-image: url({getUrl()}); background-repeat: no-repeat; width: 800px; height: 600px;">
            <Media style="background-image: url({getUrl()})" aspectRatio="square" />
            </div>
            <Content class="mdc-typography--body2">
              <h2 class="mdc-typography--headline6" style="margin: 0;">
                {workerData.formatted_name}
              </h2>
              <h3
                class="mdc-typography--subtitle2"
                style="margin: 0 0 10px; color: #888;"
              >
              {#each workerData.occupations as occupation}

              {#if occupation.specialty}
              <List twoLine nonInteractive>

                    <Item>
                        <Text>
                            <PrimaryText>{occupation.label}</PrimaryText>
                            {#if occupation.specialty}
                                <SecondaryText>Spécialité: {occupation.specialty.label}</SecondaryText>
                            {/if}
                        </Text>
                    </Item>
            </List>
            {:else}
            <List oneLine nonInteractive>
                    <Item>
                        <Text>
                            <PrimaryText style="padding: 5px;">{occupation.label}</PrimaryText>
                        </Text>
                    </Item>
            </List>
                {/if}

              {/each}
            </h3>

              It's all in this card. It's a veritable smorgasbord of card features.
            </Content>
          </PrimaryAction>
          <Actions>
            <ActionButtons>
              <Button on:click={() => clicked++}>
                <Label>Action</Label>
              </Button>
              <Button on:click={() => clicked++}>
                <Label>Another</Label>
              </Button>
            </ActionButtons>
            <ActionIcons>
              <IconButton
                on:click={() => clicked++}
                toggle
                aria-label="Add to favorites"
                title="Add to favorites"
              >
                <Icon class="material-icons" on>favorite</Icon>
                <Icon class="material-icons">favorite_border</Icon>
              </IconButton>
              <IconButton
                class="material-icons"
                on:click={() => clicked++}
                title="Share">share</IconButton
              >
              <IconButton
                class="material-icons"
                on:click={() => clicked++}
                title="More options">more_vert</IconButton
              >
            </ActionIcons>
          </Actions>
        </Card>
      </div>
</div-->

<style>
</style>
