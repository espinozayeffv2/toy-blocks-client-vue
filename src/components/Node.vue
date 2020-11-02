<template>
  <v-expansion-panel class="accordion-node">
    <v-expansion-panel-header @click="onHeaderClick">
      <div class="d-flex">
        <div class="d-flex flex-column">
          <span class="accordion-header-name" v-text="node.name" />
          <span class="accordion-header-url" v-text="node.url" />
        </div>
        <v-badge
          class="accordion-badge"
          left
          bordered
          dot
          inline
          :color="getColor"
        >
          <span class="text-uppercase accordion-status-text" v-text="getStatusText" />
        </v-badge> 
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
        <p v-if="!nodeIsOnline" class="accordion-block-error-text">
            Cannont retrieve the blocks for this node is this moment. Try again later.
        </p>
        <v-progress-linear v-else-if="blocks.loading" indeterminate class="pa-2" />
        <template v-else>
            <block v-for="(item, i) in blocks.list" :key="i" :block="item" />
        </template>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'node',
    components: {
        Block: () => import('./Block'),
    },
    props: {
        node: {
            id: Number,
            url: String,
            online: Boolean,
            name: String,
            loading: Boolean,
        }
    },
    data: () => ({
    }),
    computed: {
        ...mapGetters(['getBlocks']),
        blocks() {
            return this.getBlocks(this.node.id)
        },
        nodeIsOnline(){
            return this.node.online
        },
        getColor() {
            return this.nodeIsOnline ? "#18cc55" : '#Eb5757';
        },
        getStatusText() {
            if (this.node.loading) return 'Loading';

            return this.nodeIsOnline ? 'Online' : 'Offline';
        },
        blocksAreNotEmpty(){
            return !!this.blocks.list.length
        }
    },
    methods: {
        ...mapActions(['getBlocksFromNode']),
        onHeaderClick() {
            if (!this.blocksAreNotEmpty && !this.nodeIsOnline) return 
            const params = {
                id: this.node.id,
                url: this.node.url
            }
            this.getBlocksFromNode(params)
        }
    },
}
</script>

<style scoped>
  .accordion-badge {
    margin-left: auto;
    margin-right: 12px;
    margin-top: 1px;
  }
  .accordion-header-name {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.44px;
    color: #263238;
  }

  .accordion-header-url {
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.25px;
    color: #263238;
    opacity: 0.54;
  }

  .accordion-status-text {
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 1.5px;
    color: #263238;
  }

  .accordion-block-error-text {
    margin: 0;
    color: #263238;
    font-size: 14px;
    letter-spacing: 0.25px;
  }
</style>

<style>
  .accordion-node .v-expansion-panels--accordion {
    padding-bottom: 12px;
  }

  .accordion-node .accordion-badge.v-badge--dot .v-badge__badge {
    height: 6px;
    margin-top: 18px;
    width: 6px;
  }

  @media only screen and (max-width: 442px) {
    .accordion-node .accordion-badge.v-badge--dot .v-badge__badge {
      margin-top: 28px;
    }  
  }
</style>