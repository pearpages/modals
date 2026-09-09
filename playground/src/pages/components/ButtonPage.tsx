import { Page } from '../../components/Page'
import { Showcase } from '../../components/Showcase'
import { PropsTable } from '../../components/PropsTable'
import { Callout } from '../../components/Callout'
import ButtonVariants from '../../examples/components/modal-button/ButtonVariants'
import buttonVariantsSource from '../../examples/components/modal-button/ButtonVariants.tsx?raw'
import ButtonSizes from '../../examples/components/modal-button/ButtonSizes'
import buttonSizesSource from '../../examples/components/modal-button/ButtonSizes.tsx?raw'
import ButtonLoading from '../../examples/components/modal-button/ButtonLoading'
import buttonLoadingSource from '../../examples/components/modal-button/ButtonLoading.tsx?raw'

export function ButtonPage() {
  return (
    <Page
      title="Modal.Button"
      lead="A button styled to match the modal chrome. Optional — your own buttons work everywhere one of these does."
    >
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'primary' | 'secondary' | 'danger' | 'success' | 'warning'",
            default: "'secondary'",
            description: 'Visual weight and colour.',
          },
          {
            name: 'size',
            type: "'small' | 'medium' | 'large'",
            default: "'medium'",
            description: 'Padding and font size.',
          },
          {
            name: 'loading',
            type: 'boolean',
            default: 'false',
            description: 'Shows a spinner and disables the button.',
          },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button.' },
          { name: 'asChild', type: 'boolean', default: 'false', description: 'Use your own element.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Label.' },
        ]}
      />
      <p>
        It forwards a ref to the underlying element, so it works with focus management
        and form libraries.
      </p>

      <Showcase title="Variants" code={buttonVariantsSource} fileName="ButtonVariants.tsx">
        <ButtonVariants />
      </Showcase>

      <Showcase title="Sizes" code={buttonSizesSource} fileName="ButtonSizes.tsx">
        <ButtonSizes />
      </Showcase>

      <Showcase
        title="Loading and disabled"
        code={buttonLoadingSource}
        fileName="ButtonLoading.tsx"
        description="loading implies disabled, so you do not have to pass both."
      >
        <ButtonLoading />
      </Showcase>

      <Callout variant="info" title="Styled with variables too">
        <p>
          Its colours come from CSS custom properties like everything else, so you can
          restyle these without overriding rules.
        </p>
      </Callout>
    </Page>
  )
}
