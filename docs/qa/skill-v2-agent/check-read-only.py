from pathlib import Path
import json
base=Path(__file__).parent
before=json.loads((base/'before-hashes.json').read_text())
after=json.loads((base/'after-hashes.json').read_text())
old={k:v for k,v in before.items() if k.startswith('next-review/')}
new={k:v for k,v in after.items() if k.startswith('next-review/')}
assert old == new
print('All',len(old),'Next fixture files have identical before/after SHA256 hashes')
print(json.dumps(old,indent=2))
