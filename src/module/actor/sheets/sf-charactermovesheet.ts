import CharacterMoveSheet from '../../vue/sf-charactermovesheet.vue'
import { IronswornActor } from '../actor'
import { App } from 'vue'
import { $ActorKey } from '../../vue/provisions'
import { VueAppMixin } from '../../vue/vueapp.js'
import { MoveSheetTour } from '../../features/tours/move-sheet-tour'

export class SFCharacterMoveSheet extends VueAppMixin(Application) {
  constructor(
    protected actor: IronswornActor,
    protected toolset: 'ironsworn' | 'starforged' = 'starforged',
    options?: Partial<ApplicationOptions>
  ) {
    super(options)
  }

  getData(
    options?: Partial<ApplicationOptions> | undefined
  ): MaybePromise<object> {
    return {
      ...super.getData(options),
      toolset: this.toolset,
      actor: this.actor.toObject(),
    }
  }

  setupVueApp(app: App<any>): void {
    app.provide($ActorKey, this.actor)
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      resizable: true,
      width: 350,
      height: 820,
      left: 685,
      rootComponent: CharacterMoveSheet,
    }) as any
  }

  get title() {
    return `${game.i18n.localize('IRONSWORN.ITEMS.TypeMove')} — ${
      this.actor.name
    }`
  }

  activateTab(tabKey: string) {
    this.localEmitter.emit('activateTab', tabKey)
  }

  protected _getHeaderButtons(): Application.HeaderButton[] {
    return [
      {
        class: 'ironsworn-help',
        icon: 'fa fa-circle-question',
        label: '',
        onclick: async () => {
          const tour = new MoveSheetTour(this)
          await tour.reset()
          tour.start()
        },
      },
      ...super._getHeaderButtons(),
    ]
  }
}
