import {
  Button,
  Dialog,
  Portal,
} from "@chakra-ui/react";


export default function GenericDialog({
  triggerLabel = "Abrir",
  title,
  description,
  children,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
}) {
  return (
    <Dialog.Root>
      {/* Botão que abre o Dialog */}
      <Dialog.Trigger asChild>
        <Button colorScheme="blue">{triggerLabel}</Button>
      </Dialog.Trigger>

      {/* Conteúdo do Dialog */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {/* <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
              {description && (
                <Dialog.Description>{description}</Dialog.Description>
              )}
            </Dialog.Header> */}

            <Dialog.Body>{children}</Dialog.Body>

            <Dialog.Footer>
              {/* Fechar */}
              {/* <Dialog.CloseTrigger asChild>
                <Button variant="outline" mr={3}>
                  {cancelLabel}
                </Button>
              </Dialog.CloseTrigger> */}

              {/* Confirmar */}
              <Button colorScheme="blue" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}