## Dialogue with js DSL for making a request for courier

### xml dialogue

```
<dialogue name="makeRequest">
...
  <question type="yesno" name="location" from="ai">
    <text>Can we recognize the RTA location?</text>
    <answer value="yes" from="ctx" />
    <answer value="no" from="ctx">
      <question name="location" type="object" from="ai">
        <text>Where are you?</text>
        <answer name="address" from="channel" schema="Econt.address" />
      </question>
    </answer>
  </question>

  <question type="yesno" name="parcelSize" from="ai">
    <text>Do we know the usual package size for the RTA?</text>
    <answer value="yes" from="ctx" />
    <answer value="no" from="ctx">
      <question type="select" name="parcelSize" from="ai">
        <text>What is the parcel size?</text>
        <answer name="parcel" value="big" from="channel">
          <text>Big</text>
        </answer>
        <answer name="parcel" value="small" from="channel">
          <text>Small</text>
        </answer>
      </question>
    </answer>
  </question>
...
  <question name="scheduleRequest" type="command" from="ai">
    <request target="scheduler" source="ctx" />
    <answer type="command-result" value="success" from="scheduler">
      <question type="degreeting" from="scheduler">
        <text>Your request is acknowledged.</text>
        <answer from="channel" />
      </question>
    </answer>
    <answer type="command-result" value="fail" from="scheduler">
      <question type="command" from="dialogue">
        <run question_name="scheduleRequest" max-retry="2" sync="true" />
        <answer type="command-result" from="dialogue" value="success" />
        <answer type="command-result" from="dialogue" value="fail">
          <run dialogue_name="call" sync="false" />
        </answer>
      </question>
    </answer>
  </question>
...
</dialogue>
```

### js equivalent for dialogue

```
dialogue('makeRequest', () => {
  yesnoQuestion('location', 'Can we recognize the RTA location?', () => {
    answerNo(() => {
      objectQuestion('location', 'Where are you?', () => {
        answerObject('address', 'Econt.address').from('channel')
      }).from('ai')
    }).from('ctx')
  }).from('ai')

  yesnoQuestion('parcelSize', 'Do we know the usual package size for the RTA?', () => {
    answerNo(() => {
      selectQuestion('parcelSize', 'What is the parcel size?', () => {
        answerOption('big', 'Big').from('channel')
        answerOption('small', 'Small').from('channel')
      }).from('ai')
    }).from('ctx')
  }).from('ai')

  commandQuestion(request('scheduleRequest', 'scheduler', 'ctx'), () => {
    answerCmdResult('success', () => {
      degreetingQuestion('Your request is acknowledged.').from('scheduler')
    }).from('scheduler')
    answerCmdResult('fail', () => {
      commandQuestion(run('scheduleRequest', 2, true, () => {
        answerCmdResult('success').from('dialogue')
        answerCmdResult('fail', () => {
          run('call')
        }).from('dialogue')
      })).from('dialogue')
    }).from('scheduler')
  }).from('ai')
})
```
