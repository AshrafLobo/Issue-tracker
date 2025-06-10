'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

function DeleteIssueButton({ issueId }: { issueId: number }) {
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleClick() {
    try {
      const response = await fetch(`/api/issues/${issueId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setError(true);
        return;
      }

      router.push('/issues');
      router.refresh();
    } catch {
      setError(true);
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This cannot be undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" variant="solid" onClick={handleClick}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            mt="2"
            color="gray"
            variant="soft"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

export default DeleteIssueButton;
