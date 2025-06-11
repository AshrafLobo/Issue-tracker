'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

import { Spinner } from '@/app/components';

function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  async function handleClick() {
    try {
      setDeleting(true);

      const response = await fetch(`/api/issues/${issueId}`, {
        method: 'DELETE',
      });

      setDeleting(false);

      if (!response.ok) {
        setError(true);
        return;
      }

      router.push('/issues');
      router.refresh();
    } catch {
      setError(true);
      setDeleting(false);
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
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
