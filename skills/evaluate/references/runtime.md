# Executable outputs

Evaluate behavior through the narrowest real consumer path that covers the requested outcome. Static
checks and unit tests support the observation when they exercise lower-level contracts.

## Application code

- Use the repository's verification skill and relevant feature-map recipes when available.
- Run the changed behavior through its public interface.
- Exercise the positive outcome and the material boundary or failure case.
- Use targeted tests to preserve the demonstrated behavior.
- Use type, lint, and build checks for the properties they directly establish.

## Business policy

- Identify each affected stable policy key from the plan or current policy set.
- Exercise the stated outcome through its real consumer path.
- Exercise each material boundary or exception changed by the work.
- Link the policy key to the test, monitoring signal, or direct validation that proves it.
- Report the exact missing verifier when an existing policy has a proof gap.

A changed policy remains unproved until direct inspection covers its outcome and material
boundaries.

## Command-line tools

- Run the built command as a user invokes it.
- Inspect exit status, standard output, standard error, and filesystem or remote side effects.
- Include a representative failure or help path when the change affects it.

## Services and APIs

- Start or reach the actual service surface.
- Send representative requests and inspect responses and material side effects.
- Check authorization, persistence, or asynchronous completion when the outcome depends on them.

## Configuration and deployment

- Load the configuration through its real consumer.
- Inspect the resolved value or deployed state rather than the source file alone.
- Keep environment mutations inside the user's authorized target.

## Skills and instructions

- Validate syntax, metadata, pointers, and referenced resources.
- Run realistic requests that should activate the behavior.
- Run nearby requests that should not activate it when routing is a material risk.
- Judge the resulting decisions and artifacts instead of matching exact wording.
